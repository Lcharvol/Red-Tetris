import { findIndex, propEq, isNil, length, find, remove } from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { removeToast, emitToRoom, emitToSocket } from './utils';
import { initialBoard } from '../constants/board';

import Game from './Game';

const playerLogger = debug('tetris:player');

const Player = {

    disconnect(socket, io, rooms, socketIdToDelete) {
        rooms.map((room, id) => {
            let userIndex = findIndex(propEq('id', socketIdToDelete[0]))(room.users);
            if(userIndex >= 0) {
                let { roomName, users } = rooms[id]
                let user = users[userIndex];
                let newUsers = remove(userIndex, 1, users);
                playerLogger(`${user.name} leave the ${roomName} room`);
                socket.leave(roomName);
                if(length(newUsers) === 1)
                    newUsers[0].owner = true;
                rooms[id].users = newUsers;
                if(length(newUsers) === 0)
                    rooms = Game.deleteRoom(rooms, id);
                emitToRoom(io, roomName, 'action', 'updateGameInfo', {
                    ...rooms[id],
                    toasts: [Game.newToast(`${user.name} leave the room`)]
                });
                removeToast(io, roomName);
            }
        })
        return rooms;
    },

    joinRoom(socket, io, data, rooms, currentSocketId) {
        const { roomName, user } = data;
        const roomIndex = findIndex(propEq('roomName', roomName))(rooms);
        const room = rooms[roomIndex];
        const fullRoom = roomIndex >= 0 && length(rooms[roomIndex].users) >= 2;

        if(length(roomName) === 0 || length(user) === 0)
            return rooms;
        if(fullRoom) {
            const allreadyInRoom = !isNil(find(propEq('name', user))(room.users));

            if(allreadyInRoom) {
                playerLogger(`${user} try to join the ${roomName} room, but he's allready in`);
                emitToSocket(socket, 'gameError', 'allreadyInRoom', `${user} is allready in this room !`);
            }
            else {
                emitToSocket(socket, 'gameError', 'fullRoom', 'This room is full')
                playerLogger('Too many player in the room');
            }
        } else {
            const isRoomDefined = !isNil(room);
            const allreadyInRoom = !isRoomDefined ? false : !isNil(find(propEq('name', user),room.users));
            const gameStarted = isRoomDefined ? room.isGameStarted : false;

            if(gameStarted) {
                emitToSocket(socket, 'gameError', 'gameStarted', 'Game in progress in this room !');
            } else if(allreadyInRoom) {
                playerLogger(`${user} try to join the ${roomName} room, but he's allready in`);
                emitToSocket(socket, 'gameError', 'allreadyInRoom', `${user} is allready in this room !`);
            } else {
                const newUser = 
                        {
                            name: user,
                            owner: isRoomDefined ? false : true,
                            id: currentSocketId[0],
                            board: initialBoard,
                            win: null,
                            activePiece: null,
                            lineToGive: 0,
                            score: 0,
                        };

                socket.join(roomName);
                if(roomIndex < 0) rooms = Game.addRoom(rooms, [newUser], roomName);
                else rooms[roomIndex] = {...room, users: [...rooms[roomIndex].users, newUser], name: roomName};
                const newRoom = rooms[roomIndex] || rooms[findIndex(propEq('roomName', roomName))(rooms)];
                emitToRoom(io, roomName, 'action', 'updateGameInfo', {
                    ...newRoom,
                    toasts: [ Game.newToast(`${user} join the room`)]
                });
                removeToast(io, roomName);
                playerLogger(`${user} join the ${roomName} room`);
            }
        }
        return rooms;
    }
};
export default Player;
