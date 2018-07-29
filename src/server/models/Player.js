import { findIndex, propEq, isNil, length, find, remove } from 'ramda';
import debug from 'debug';
import uuidv1 from 'uuid/v1';

import { removeToast, emitToRoom, emitToSocket } from './utils';
import { initialBoard } from '../constants/board';

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
                users = newUsers;
                rooms[id].users = newUsers;
                emitToRoom(io, name, 'action', 'updateGameInfo', { name: room, users: newUsers, toast: { id: uuidv1(), message:`${user.name} leave the room`} });
            }
        })
        return rooms;
    },

    joinRoom(socket, io, data, rooms, currentSocketId) {
        const { room, user } = data;
        const roomIndex = findIndex(propEq('name', room))(rooms);
        if(roomIndex >= 0 && length(rooms[roomIndex].users) >= 2) {
            const allreadyInRoom= !isNil(find(propEq('name', user))(rooms[roomIndex].users));
            if(allreadyInRoom) {
                playerLogger(`${user} try to join the ${room} room, but he's allready in`);
                emitToSocket(socket, 'gameError', 'allreadyInRoom', `${user} is allready in this room !`);
            }
            else {
                emitToSocket(socket, 'gameError', 'fullRoom', 'This room is full')
                playerLogger('Too many player in the room');
            }
        } else {
            const isRoomDefined = !isNil(rooms[roomIndex]);
            const allreadyInRoom = !isRoomDefined ? false : !isNil(find(propEq('name', user),rooms[roomIndex].users));
            if(allreadyInRoom) {
                playerLogger(`${user} try to join the ${room} room, but he's allready in`);
                emitToSocket(socket, 'gameError', 'allreadyInRoom', `${user} is allready in this room !`)
            } else {
                const users = isRoomDefined ? [...rooms[roomIndex].users, {name: user, owner: false, id: currentSocketId[0], board: initialBoard}] : [{name: user, owner: true, id: currentSocketId[0], board: initialBoard}];
                socket.join(room);
                if(roomIndex < 0) rooms = [...rooms, {users, name: room}]
                else rooms[roomIndex] = {...rooms[roomIndex], users, name: room};   
                emitToRoom(io, room, 'action', 'updateGameInfo', { name: room, users, toast: { id: uuidv1(), message:`${user} join the room`} });
                removeToast(io, room);
                playerLogger(`${user} join the ${room} room`);
            }
        }
        return rooms;
    }
};
export default Player;
