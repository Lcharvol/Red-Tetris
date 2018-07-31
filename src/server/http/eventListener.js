import { findIndex, propEq, equals } from 'ramda';
import debug from 'debug';

import Player from '../models/Player';
import Game from '../models/Game';

import {
    DISCONNECT,
    JOIN_ROOM,
    ACTION
} from '../constants/eventsTypes';
import {
    START_GAME,
    MOVE
} from '../constants/actionsTypes';

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

            if(equals(actionSocket.name, START_GAME)) rooms = Game.startGame(io, actionSocket, roomIndex, rooms);

            if(equals(actionSocket.name, JOIN_ROOM)) logger(`${actionSocket.user} join the room: ${actionSocket.room}`);

            if(equals(actionSocket.name, MOVE)) rooms = Game.move(socket, io, actionSocket, roomIndex, rooms);
        });
};

export default eventListener;