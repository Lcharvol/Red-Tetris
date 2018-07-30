import {
    findIndex,
    propEq,
    isNil,
    length,
    find,
    contains,
    remove,
    equals
} from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { removeToast, emitToRoom, emitToSocket } from './utils';
import { initialBoard } from '../constants/board';
import {
    addRandomPiece,
    addPiece,
    moveBottom,
    moveRight,
    moveLeft,
} from '../boardManager';
import Piece from './Piece';

const gameLogger = debug('tetris:game');

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
            const room = rooms[roomIndex];
            const newPiece = Piece.newPiece();
            const initialPiece = Piece.newPiece();
            const numberOfPlayer = length(room.users);
            const newUsers = numberOfPlayer === 2 ? [
                {
                    ...room.users[0],
                    board: addPiece(room.users[0].board, initialPiece),
                    pieces: [newPiece],
                },
                {
                    ...room.users[1],
                    board: addPiece(room.users[1].board, initialPiece),
                    pieces: [newPiece],
                },
            ] : [
                {
                    ...room.users[0],
                    board: addPiece(room.users[0].board, initialPiece),
                    pieces: [newPiece],
                },
            ];
            emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { name: actionSocket.gameName, isGameStarted: true, users: newUsers });
            rooms[roomIndex] = {...rooms[roomIndex], users: newUsers}
            setInterval(() => {
                const user1 = rooms[roomIndex].users[0];
                const user2 = rooms[roomIndex].users[1];
                const newUser1 = moveBottom(user1.board, user1.pieces);
                const newUser2 = !isNil(user2) ? moveBottom(user2.board, user2.pieces) : user1;
                const needNewPiece = length(newUser1.pieces) <= 2 || length(newUser2.pieces) <= 2;
                const newPiece = Piece.newPiece();
                const newUsers = numberOfPlayer === 2 ? [
                    {
                        ...rooms[roomIndex].users[0],
                        board: newUser1.board,
                        pieces: needNewPiece ? [...newUser1.pieces, newPiece] : newUser1.pieces,
                    },
                    {
                        ...rooms[roomIndex].users[1],
                        board: newUser2.board,
                        pieces: needNewPiece ? [...newUser2.pieces, newPiece] : newUser2.pieces,
                    },
                ] : [
                    {
                        ...rooms[roomIndex].users[0],
                        board: newUser1.board,
                        pieces: needNewPiece ? [...newUser1.pieces, newPiece] : newUser1.pieces,
                    },
                ];
                rooms[roomIndex] = {...rooms[roomIndex], users: newUsers};
                emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: newUsers });
            },500);
            gameLogger(`Game start in tgamehe room: \"${actionSocket.gameName}\"`)
        }, 3500);
        return rooms;
    },

    move(io, actionSocket, roomIndex, rooms) {
        const { user, type } = actionSocket;
        const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
        
        if(equals(type,'bottom')) {
            const user = rooms[roomIndex].users[userRoomIndex]
            const newUser = moveBottom(user.board, user.pieces);
            const needNewPiece = length(user.pieces) <= 1;
            rooms[roomIndex].users[userRoomIndex] = {...user, board: newUser.board, pieces: needNewPiece ? [...newUser.pieces, Piece.newPiece()] : newUser.pieces }
        };
        if(equals(type, 'right'))
            rooms[roomIndex].users[userRoomIndex].board = moveRight(rooms[roomIndex].users[userRoomIndex].board);
        if(equals(type,'left'))
            rooms[roomIndex].users[userRoomIndex].board = moveLeft(rooms[roomIndex].users[userRoomIndex].board);
        emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: rooms[roomIndex].users });
        return rooms;
    },

    deleteRoom(rooms,id) {
        return remove(id, 1, rooms);
    }
};
export default Game;
