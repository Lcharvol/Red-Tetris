import {
    findIndex, 
    propEq,
    isNil,
    length,
    find,
    remove,
    equals
} from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { initialBoard } from '../constants/board';
import { ACTION, GAME_ERROR } from '../constants/eventsTypes';
import { UPDATE_GAME_INFO } from '../constants/actionsTypes';
import { GAME_STARTED, ALLREADY_IN_ROOM, FULL_ROOM } from '../constants/gameErrors';

import { removeToast, emitToRoom, emitToSocket } from '../socketIo/utils';
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
                const newToasts = [Game.newToast(`${user.name} leave the room`)];
                playerLogger(`${user.name} leave the ${roomName} room`);
                socket.leave(roomName);
                if(equals(length(newUsers),1))
                    newUsers[0].owner = true;
                rooms[id].users = newUsers;
                if(equals(length(newUsers),0))
                    rooms = Game.deleteRoom(rooms, id);
                emitToRoom(io, roomName, ACTION, UPDATE_GAME_INFO, {
                    ...rooms[id],
                    toasts: newToasts
                });
                removeToast(io, roomName, newToasts[0].id);
            }
        })
        return rooms;
    },

    joinRoom(socket, io, data, rooms, currentSocketId) {
        const { roomName, user } = data;
        const roomIndex = findIndex(propEq('roomName', roomName))(rooms);
        const room = rooms[roomIndex];
        const fullRoom = roomIndex >= 0 && length(rooms[roomIndex].users) >= 2;
        const isRoomDefined = !isNil(room);
        const allreadyInRoom = !isRoomDefined ? false : !isNil(find(propEq('name', user),room.users));
        const gameStarted = isRoomDefined ? room.isGameStarted : false;
        
        if(fullRoom) {
            if(allreadyInRoom)
                emitToSocket(socket, GAME_ERROR, ALLREADY_IN_ROOM, `${user} is allready in this room !`)
            else
                emitToSocket(socket, GAME_ERROR, FULL_ROOM, 'This room is full');
            playerLogger(`${user} try to join ${roomName}, but the room is full`);
        } else {
            if(gameStarted) {
                emitToSocket(socket, GAME_ERROR, GAME_STARTED, 'Game in progress in this room !');
            } else if(allreadyInRoom) {
                playerLogger(`${user} try to join the ${roomName} room, but he's allready in`);
                emitToSocket(socket, GAME_ERROR, 'allreadyInRoom', `${user} is allready in this room !`);
            } else {
                const newUser = {
                    name: user,
                    owner: isRoomDefined ? false : true,
                    id: currentSocketId[0],
                    board: initialBoard,
                    win: null,
                    activePiece: null,
                    lineToGive: 0,
                    score: 0,
                };
                const newToasts = [Game.newToast(`${user} join the room`)];

                socket.join(roomName);
                if(roomIndex < 0) rooms = Game.addRoom(rooms, [newUser], roomName);
                else rooms[roomIndex] = {...room, users: [...rooms[roomIndex].users, newUser], name: roomName};
                const newRoom = rooms[roomIndex] || rooms[findIndex(propEq('roomName', roomName))(rooms)];
                emitToRoom(io, roomName, ACTION, UPDATE_GAME_INFO, {
                    ...newRoom,
                    toasts: newToasts
                });
                removeToast(io, roomName, newToasts[0].id);
                playerLogger(`${user} join the ${roomName} room`);
            }
        }
        return rooms;
    }
};
export default Player;
