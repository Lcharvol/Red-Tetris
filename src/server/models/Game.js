import { findIndex, propEq, isNil, length, find, contains, remove } from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { removeToast, emitToRoom, emitToSocket } from './utils';
import { initialBoard } from '../constants/board';
import {
    addRandomPiece,
    moveBottom,
    moveRight,
    moveLeft,
} from '../boardManager';

const logger = debug('tetris:http');
const roomLogger = debug('tetris:room');

const Game = {
    
    startGame(io, actionSocket, roomIndex, rooms) {
        if(roomIndex < 0) return;
        io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'3', toast: { id: uuidv1(), message:`${actionSocket.user} start the game`}}});
        removeToast(io, actionSocket.gameName);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'2'}), 1000);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'1'}), 2000);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'GO'}), 3000);
        setTimeout(() => {
            emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: false, modalMessage:''})
            const newUsersBoard = [
                {
                    ...rooms[roomIndex].users[0],
                    board: addRandomPiece(rooms[roomIndex].users[0].board),
                },
                {
                    ...rooms[roomIndex].users[1],
                    board: addRandomPiece(rooms[roomIndex].users[1].board),
                },
            ];
            emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { name: actionSocket.gameName, isGameStarted: true, users: newUsersBoard });
            rooms[roomIndex] = {...rooms[roomIndex], users: newUsersBoard}
            setInterval(() => {
                const newUsers = [
                    {
                        ...rooms[roomIndex].users[0],
                        board: moveBottom(rooms[roomIndex].users[0].board),
                    },
                    {
                        ...rooms[roomIndex].users[1],
                        board: moveBottom(rooms[roomIndex].users[1].board),
                    },
                ];
                rooms[roomIndex] = {...rooms[roomIndex], users: newUsers};
                emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: newUsers });
            },500);
            logger(`Game start in the room: \"${actionSocket.gameName}\"`)
        }, 3500);
        return rooms;
    },

    move(io, actionSocket, roomIndex, rooms) {
        const { user, type } = actionSocket;
        const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
        
        if(type === 'bottom')
            rooms[roomIndex].users[userRoomIndex].board = moveBottom(rooms[roomIndex].users[userRoomIndex].board);
        if(type === 'right')
            rooms[roomIndex].users[userRoomIndex].board = moveRight(rooms[roomIndex].users[userRoomIndex].board);
        if(type === 'left')
            rooms[roomIndex].users[userRoomIndex].board = moveLeft(rooms[roomIndex].users[userRoomIndex].board);
        emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: rooms[roomIndex].users });
        return rooms;
    }
};
export default Game;
