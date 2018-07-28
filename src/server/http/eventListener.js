import { findIndex, propEq, isNil, length, find, contains, remove } from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { initialBoard } from '../constants/board';
import {
    addRandomPiece,
    moveBottom,
    moveRight,
    moveLeft,
} from '../boardManager';
import { removeToast, emitToRoom, emitToSocket } from './utils';

const logger = debug('tetris:http');
const roomLogger = debug('tetris:room');

let rooms = [];

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
            let roomIndex = undefined;
            let user = undefined;
            rooms.map((room, id) => {
                let userIndex = findIndex(propEq('id', socketIdToDelete[0]))(room.users);
                if(userIndex >= 0) {
                    user = rooms[id].users[userIndex];
                    roomLogger(`${user.name} leave the ${rooms[id].name} room`);
                    socket.leave(rooms[id].name);
                    const newUsers = remove(userIndex, 1, rooms[id].users);
                    rooms[id].users = newUsers;
                    emitToRoom(io, rooms[id].name, 'action', 'updateGameInfo', { name: room, users: newUsers, toast: { id: uuidv1(), message:`${user.name} leave the room`} });
                }
            })
        })
        .on('joinRoom', async data => {
            const { room, user } = data;
            const roomIndex = findIndex(propEq('name', room))(rooms);
            if(roomIndex >= 0 && length(rooms[roomIndex].users) >= 2) {
                const userAllreadyIn = !isNil(find(propEq('name', user))(rooms[roomIndex].users));
                if(userAllreadyIn) {
                    roomLogger(`${user} try to join the ${room} room, but he's allready in`);
                } else {
                    emitToSocket(socket, 'gameError', 'fullRoom', 'This room is full')
                    roomLogger('Too many player in the room');
                }
            } else {
                socket.join(room);
                const users = !isNil(rooms[roomIndex]) ? [...rooms[roomIndex].users, {name: user, owner: false, id: currentSocketId[0], board: initialBoard}] : [{name: user, owner: true, id: currentSocketId[0], board: initialBoard}];
                if(roomIndex < 0) rooms = [...rooms, {users, name: room}]
                else rooms[roomIndex] = {...rooms[roomIndex], users, name: room};   
                emitToRoom(io, room, 'action', 'updateGameInfo', { name: room, users, toast: { id: uuidv1(), message:`${user} join the room`} });
                removeToast(io, room);
                roomLogger(`${user} join the ${room} room`);
            }
        })
        .on('action', async actionSocket => {
            const roomIndex = findIndex(propEq('name', actionSocket.gameName))(rooms);
            if(actionSocket.name === 'startGame') {
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