import { findIndex, propEq, isNil, length } from 'ramda';
import debug from 'debug';

import { initialBoard } from '../constants/board';
import {
    addRandomPiece,
    moveBottom,
    moveRight,
    moveLeft,
} from '../boardManager';
import { TOAST_DURATION } from '../constants/game';

const logger = debug('tetris:http');

let rooms = [];

const removeToast = (io, room) => setTimeout(() => io.to(room).emit('action', { name: 'updateGameInfo', body: { displayToast: false, toastMessage: `` }}), TOAST_DURATION);

const emitToRoom = (io, room, type, name, body) => io.to(room).emit(type, { name, body });

const emitToSocket = (socket, type, name, message) =>  socket.emit(type, { name, message });

const eventListener = (socket, io) => {
    const currentSocketId = [];
    const socketIdToDelete = [];
    const tmp = [];

    currentSocketId[0] = socket.id;
    logger("Socket connected: " + currentSocketId);

    socket
        .on('disconnect', async () => {
            logger("Socket disconnected: " + currentSocketId)
            socketIdToDelete[0] = socket.id;
        })
        .on('joinRoom', function(data) {
            const { room, user } = data;
            const roomIndex = findIndex(propEq('name', room))(rooms);
            if(roomIndex >= 0 && length(rooms[roomIndex].users) >= 2) {
                emitToSocket(socket, 'gameError', 'fullRoom', 'This room is full')
                logger('Too many player in the room');    
            } else {
                socket.join(room);
                const users = !isNil(rooms[roomIndex]) ? [...rooms[roomIndex].users, {name: user, owner: false, id: currentSocketId[0], board: initialBoard}] : [{name: user, owner: true, id: currentSocketId[0], board: initialBoard}];
                if(roomIndex < 0) rooms = [...rooms, {users, name: room}]
                else rooms[roomIndex] = {...rooms[roomIndex], users, name: room};   
                emitToRoom(io, room, 'action', 'updateGameInfo', { name: room, users, displayToast: true, toastMessage: `${user} join the room` });
                removeToast(io, room);
                logger(`${user} join the ${room} room`);
            }
        })
        .on('action', function(actionSocket) {
            const roomIndex = findIndex(propEq('name', actionSocket.gameName))(rooms);
            if(actionSocket.name === 'startGame') {
                if(roomIndex < 0) return;
                io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'3', displayToast: true, toastMessage: `${actionSocket.user} start the game`}});
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
            };

            if(actionSocket.name === 'joinRoom') logger(`${actionSocket.user} join the room: ${actionSocket.room}`);

            if(actionSocket.name === 'move') {
                const { user, type } = actionSocket;
                const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
                if(type === 'bottom')
                    rooms[roomIndex].users[userRoomIndex].board = moveBottom(rooms[roomIndex].users[userRoomIndex].board);
                if(type === 'right')
                    rooms[roomIndex].users[userRoomIndex].board = moveRight(rooms[roomIndex].users[userRoomIndex].board);
                if(type === 'left')
                    rooms[roomIndex].users[userRoomIndex].board = moveLeft(rooms[roomIndex].users[userRoomIndex].board);
                emitToRoom(io, actionSocket.gameName, 'action', 'updateGameInfo', { users: rooms[roomIndex].users });
            }
        });
};

export default eventListener;