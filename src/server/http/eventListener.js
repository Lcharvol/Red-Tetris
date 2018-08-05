import { findIndex, propEq, equals, isNil, length } from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import Player from '../models/Player';
import Game from '../models/Game';
import Piece from '../models/Piece';
import {
    DISCONNECT,
    JOIN_ROOM,
    ACTION
} from '../constants/eventsTypes';
import { DROP_INTERVAL } from '../constants/game';
import {
    START_GAME,
    MOVE
} from '../constants/actionsTypes';
import { moveBottom, AddFullLine } from '../boardManager';
import { emitToRoom } from './utils';

const logger = debug('tetris:http');

let rooms = [];

const eventListener = (socket, io) => {
    const currentSocketId = [];
    const socketIdToDelete = [];

    currentSocketId[0] = socket.id;
    logger(`Socket connected: ${currentSocketId}`);
    
    socket
        .on(DISCONNECT, async () => {
            logger(`Socket disconnected: ${currentSocketId}`)
            socketIdToDelete[0] = socket.id;
            rooms = Player.disconnect(socket, io, rooms, socketIdToDelete);
        })

        .on(JOIN_ROOM, async data => rooms = Player.joinRoom(socket, io, data, rooms, currentSocketId))

        .on(ACTION, async actionSocket => {
            const roomIndex = findIndex(propEq('roomName', actionSocket.gameName))(rooms);

            if(equals(actionSocket.name, START_GAME)) {
                const res = await Game.startGame(io, actionSocket, roomIndex, rooms);
                const intv = setInterval(function(){
                    const roomIndex = findIndex(propEq('roomName', actionSocket.gameName))(rooms);
                    const room = rooms[roomIndex];
                    if(isNil(room)) return;
                    const twoPlayerGame = equals(length(room.users),2);
                    const user1 = room.users[0];
                    const user2 = twoPlayerGame ? room.users[1] : undefined;
                    let newUser1 = moveBottom(user1);
                    let newUser2 = !isNil(user2) ? moveBottom(user2) : undefined;
                    const needNewPiece = length(newUser1.pieces) <= 2 || (!isNil(newUser2) && length(newUser2.pieces) <= 2);
                    const newPiece = Piece.newPiece();
                    if(newUser1.lineToGive > 0 && !isNil(newUser2)) {
                        newUser2.board = AddFullLine(newUser2.board, newUser1.lineToGive);
                        newUser1.lineToGive = 0;
                    }
                    if(!isNil(newUser2) && newUser2.lineToGive > 0) {
                        newUser1.board = AddFullLine(newUser1.board, newUser2.lineToGive);
                        newUser2.lineToGive = 0;
                    }
                    const newUsers = !isNil(user2) ?
                    [
                        {
                            ...newUser1,
                            pieces: needNewPiece ? [...newUser1.pieces, newPiece]: newUser1.pieces,
                        },
                        {
                            ...newUser2,
                            pieces: needNewPiece ? [...newUser2.pieces, newPiece]: newUser2.pieces,
                        }
                    ] : 
                    [
                        {
                            ... newUser1,
                            pieces: needNewPiece ? [...newUser1.pieces, newPiece]: newUser1.pieces,
                        }
                    ];

                    if(isNil(user1))
                        return Game.removeRoom(rooms, intv, actionSocket.gameName, roomIndex);
                    if(!isNil(user1.win) || (!isNil(user2) && !isNil(user2.win)))
                        rooms = Game.endGame(intv, io, actionSocket.gameName, rooms, roomIndex);
                    rooms[roomIndex] = {...rooms[roomIndex], users: newUsers, intvId: uuidv1()};
                    emitToRoom(io, actionSocket.gameName, ACTION, 'updateGameInfo', { ...rooms[roomIndex] });
                },DROP_INTERVAL);
                rooms[roomIndex] = res;
            }
            if(equals(actionSocket.name, JOIN_ROOM)) logger(`${actionSocket.user} join the room: ${actionSocket.room}`);

            if(equals(actionSocket.name, MOVE)) rooms[roomIndex] = Game.move(socket, io, actionSocket, roomIndex, rooms);
        });
};

export default eventListener;