import {
    findIndex,
    propEq,
    isNil,
    length,
    find,
    contains,
    remove,
    equals,
    map,
    times
} from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { removeToast, emitToRoom, emitToSocket } from './utils';
import { initialBoard } from '../constants/board';
import { roomPattern, DROP_INTERVAL } from '../constants/game';
import { ACTION } from '../constants/eventsTypes';
import {
    moveBottom,
    moveRight,
    moveLeft,
    rotate,
} from '../boardManager';
import Piece from './Piece';

const gameLogger = debug('tetris:game');

const Game = {

    newToast(io, gameName, message) {
        removeToast(io, gameName);
        return { id: uuidv1(), message }
    },

    deleteRoom(rooms,id) {
        const room = rooms[id];
        if(room.isGameStarted)
            clearInterval(room.intv);
        return remove(id, 1, rooms);
    },
    
    newToast(message) {
        return { id: uuidv1(), message }
    },

    addRoom(rooms, users, roomName) {
        return [...rooms, { ...roomPattern, users, roomName}]
    },

    removeRoom(rooms, intv, gameName, roomIndex) {
        const newRooms = [...rooms]
        clearInterval(intv);
        gameLogger(`Game \"${gameName}\ deleted"`)
        return remove(roomIndex, 1, newRooms);
    },

    endGame(intv, io, gameName, rooms, roomIndex) {
        const winner = find(propEq('win', false))(rooms[roomIndex].users);

        clearInterval(intv);
        rooms[roomIndex] = {
            ...rooms[roomIndex],
            modal: {
                display: true,
                message: `${winner.name} loose`,
            },
            isGameStarted: false
        };
        emitToRoom(io, gameName, 'action', 'updateGameInfo', {
            ...rooms[roomIndex],
            toasts: [Game.newToast(`${gameName}'s game is finish`)]
        });
        removeToast(io, gameName);
        return rooms;
    },

    initStart(io, gameName, user, rooms, roomIndex) {
        rooms[roomIndex] = {...rooms[roomIndex], isGameStarted: true, modal: { display: false, message: ''}}
        map(user => {
            user.board = initialBoard;
        },rooms[roomIndex].users)
        emitToRoom(io, gameName, 'action', 'updateGameInfo', {
            ...rooms[roomIndex],
            modal: {
                display: true,
                message: '3'
            },
            toasts: [ Game.newToast(`${user} start the game`)]
        });
        removeToast(io, gameName);
        setTimeout(() => emitToRoom(io, gameName, 'action', 'updateGameInfo', {modal: { display: true, message: '2'}}), 1000);
        setTimeout(() => emitToRoom(io, gameName, 'action', 'updateGameInfo', {modal: { display: true, message: '1'}}), 2000);
        setTimeout(() => emitToRoom(io, gameName, 'action', 'updateGameInfo', {modal: { display: true, message: 'GO'}}), 3000);
        return rooms;
    },
    
    startGame(io, actionSocket, roomIndex, rooms) {
        return new Promise((resolve) => {
            const { gameName, user} = actionSocket;
            rooms = Game.initStart(io, gameName, user, rooms, roomIndex);
            setTimeout(() => {
                let room = rooms[roomIndex];
                const newPiece = Piece.newPiece();
                const initialPiece = Piece.newPiece();
                const numberOfPlayer = length(room.users);
                let newUsers = [];

                times(number => newUsers = [
                    ...newUsers,
                    {
                        ...room.users[number],
                        board: Piece.addPiece(room.users[number].board, initialPiece),
                        pieces: [newPiece],
                        activePiece: initialPiece,
                        win: null,
                    }
                ], numberOfPlayer);
                room = {...rooms[roomIndex], users: newUsers, isGameStarted: true};
                emitToRoom(io, gameName, ACTION, 'updateGameInfo', {
                    ...room,
                    modal: {
                        display: false,
                        message: ''
                    }
                });
                gameLogger(`Game start in the room: \"${gameName}\"`);
                resolve(room);
            }, 3500);
          })    
        },

    move(socket, io, actionSocket, roomIndex, rooms) {
        const { user, type } = actionSocket;
        const room = {...rooms[roomIndex]};
        const userIndex = findIndex(propEq('name', user))(room.users);
        const me = room.users[userIndex];
        
        if(!room.isGameStarted) {
            return rooms[roomIndex];
        } else if(equals(type,'bottom')) {
            const newUser = moveBottom(me);
            const needNewPiece = length(me.pieces) <= 2;
            if(!isNil(newUser.win)) {
                me.win = false;
            } else
                room.users[userIndex] = 
                {
                    ...newUser,
                    pieces: needNewPiece ? [...newUser.pieces, Piece.newPiece()] : newUser.pieces,
                };
        } else if(equals(type, 'right')) {
            room.users[userIndex] = moveRight(room.users[userIndex]);
        } else if(equals(type,'left')) {
            room.users[userIndex] = moveLeft(room.users[userIndex]);
        } else if(equals(type, 'rotate')) {
            room.users[userIndex] = rotate(room.users[userIndex]);
        };
        emitToRoom(io, actionSocket.gameName, ACTION, 'updateGameInfo', { ...room });
        return room;
    },
};

export default Game;
