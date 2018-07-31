import {
    findIndex,
    propEq,
    isNil,
    length,
    find,
    contains,
    remove,
    equals,
    map
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

const gameLogger = debug('tetris:game')

const Game = {

    endGame(intv, io, actionSocket, rooms, roomIndex) {
        const winner = find(propEq('win', false))(rooms[roomIndex].users);
        clearInterval(intv);
        emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {
            displayModal: true,
            modalMessage: `${winner.name} loose`,
            isGameStarted: false
        });
        rooms[roomIndex].isGameStarted = false;
        return rooms;
    },

    initStart(io, actionSocket) {
        io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'3', isGameStarted: true, toast: { id: uuidv1(), message:`${actionSocket.user} start the game`}}});
        removeToast(io, actionSocket.gameName);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'2'}), 1000);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'1'}), 2000);
        setTimeout(() => emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', {displayModal: true, modalMessage:'GO'}), 3000);
    },
    
    startGame(io, actionSocket, roomIndex, rooms) {
        if(roomIndex < 0) return;
        rooms[roomIndex] = {...rooms[roomIndex], isGameStarted: true}
        map(user => {
            user.board = initialBoard;
        },rooms[roomIndex].users)
        Game.initStart(io, actionSocket);
        setTimeout(() => {
            const room = rooms[roomIndex];
            const newPiece = Piece.newPiece();
            const initialPiece = Piece.newPiece();
            const numberOfPlayer = length(room.users); 
            const newUsers = numberOfPlayer === 2 ? [
                {
                    ...room.users[0],
                    board: addPiece(room.users[0].board, initialPiece),
                    pieces: [newPiece],
                    win: null,
                },
                {
                    ...room.users[1],
                    board: addPiece(room.users[1].board, initialPiece),
                    pieces: [newPiece],
                    win: null,
                },
            ] : [
                {
                    ...room.users[0],
                    board: addPiece(room.users[0].board, initialPiece),
                    pieces: [newPiece],
                    win: null,
                },
            ];
            const intv = setInterval(function(){
                const user1 = rooms[roomIndex].users[0];
                const user2 = rooms[roomIndex].users[1];
                if(!isNil(user1.win) || (!isNil(user2) && !isNil(user2.win)))
                    rooms = Game.endGame(intv, io, actionSocket, rooms, roomIndex);
                const newUser1 = moveBottom(user1.board, user1.pieces);
                const newUser2 = !isNil(user2) ? moveBottom(user2.board, user2.pieces) : user1;
                const needNewPiece = length(newUser1.pieces) <= 2 || length(newUser2.pieces) <= 2;
                const newPiece = Piece.newPiece();
                const newUsers = !isNil(user2) ? [
                    {
                        ...rooms[roomIndex].users[0],
                        board: newUser1.board,
                        pieces: needNewPiece ? [...newUser1.pieces, newPiece] : newUser1.pieces,
                        win: !isNil(user1.win) ? user1.win : newUser1.win,
                    },
                    {
                        ...rooms[roomIndex].users[1],
                        board: newUser2.board,
                        pieces: needNewPiece ? [...newUser2.pieces, newPiece] : newUser2.pieces,
                        win: !isNil(user1.win) ? user2.win : newUser2.win,
                    },
                ] : [
                    {
                        ...rooms[roomIndex].users[0],
                        board: newUser1.board,
                        pieces: needNewPiece ? [...newUser1.pieces, newPiece] : newUser1.pieces,
                        win: !isNil(user1.win) ? user1.win : newUser1.win,
                    },
                ];
                rooms[roomIndex] = {...rooms[roomIndex], users: newUsers, intvId: uuidv1()};
                emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: newUsers });
            },500);
            
            emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { name: actionSocket.gameName, isGameStarted: true, users: newUsers, displayModal: false, modalMessage:'' });
            rooms[roomIndex] = {...rooms[roomIndex], users: newUsers, intv, isGameStarted: true}
            gameLogger(`Game start in the room: \"${actionSocket.gameName}\"`)
        }, 3500);
        return rooms;
    },

    move(socket, io, actionSocket, roomIndex, rooms) {
        const { user, type } = actionSocket;
        const userIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
        
        if(equals(type,'bottom')) {
            const user = rooms[roomIndex].users[userIndex]
            const newUser = moveBottom(user.board, user.pieces);
            const needNewPiece = length(user.pieces) <= 1;
            if(!isNil(newUser.win)) {
                rooms[roomIndex].users[userIndex].win = false;
            } else
                rooms[roomIndex].users[userIndex] = {...user, board: newUser.board, pieces: needNewPiece ? [...newUser.pieces, Piece.newPiece()] : newUser.pieces }
        };
        if(equals(type, 'right'))
            rooms[roomIndex].users[userIndex].board = moveRight(rooms[roomIndex].users[userIndex].board);
        if(equals(type,'left'))
            rooms[roomIndex].users[userIndex].board = moveLeft(rooms[roomIndex].users[userIndex].board);
        emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: rooms[roomIndex].users });
        return rooms;
    },

    deleteRoom(rooms,id) {
        return remove(id, 1, rooms);
    },
};
export default Game;
