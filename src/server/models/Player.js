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
                let { name, users } = rooms[id]
                let user = users[userIndex];
                let newUsers = remove(userIndex, 1, users);
                playerLogger(`${user.name} leave the ${name} room`);
                socket.leave(name);
                if(length(newUsers) === 1)
                    newUsers[0].owner = true;
                rooms[id].users = newUsers;
                if(length(newUsers) === 0)
                    rooms = Game.deleteRoom(rooms, id);
                emitToRoom(io, name, 'action', 'updateGameInfo', { name: room.name, users: newUsers, toast: Game.newToast(`${user.name} leave the room`)});
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
                const users = isRoomDefined ?
                    [...room.users, {name: user, owner: false, id: currentSocketId[0], board: initialBoard, win: null }] :
                    [{name: user, owner: true, id: currentSocketId[0], board: initialBoard, win: null}];

                socket.join(roomName);
                if(roomIndex < 0) rooms = Game.addRoom(rooms, users, roomName);
                else rooms[roomIndex] = {...room, users, name: roomName};
                const newRoom = rooms[roomIndex] || rooms[findIndex(propEq('roomName', roomName))(rooms)];
                emitToRoom(io, roomName, 'action', 'updateGameInfo', { ...newRoom, toasts: [ { id: uuidv1(), message:`${user} join the room`}] });
                removeToast(io, roomName);
                playerLogger(`${user} join the ${roomName} room`);
            }
        }
        return rooms;
    }
};
export default Player;
