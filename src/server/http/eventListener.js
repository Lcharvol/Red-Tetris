import { findIndex, propEq } from 'ramda';
import debug from 'debug';

import Player from '../models/Player';
import Game from '../models/Game';

const logger = debug('tetris:http');

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
            rooms = Player.disconnect(socket, io, rooms, socketIdToDelete);
        })

        .on('joinRoom', async data => rooms = Player.joinRoom(socket, io, data, rooms, currentSocketId))

        .on('action', async actionSocket => {
            const roomIndex = findIndex(propEq('name', actionSocket.gameName))(rooms);

            if(actionSocket.name === 'startGame') rooms = Game.startGame(io, actionSocket, roomIndex, rooms);

            if(actionSocket.name === 'joinRoom') logger(`${actionSocket.user} join the room: ${actionSocket.room}`);

            if(actionSocket.name === 'move') rooms = Game.move(io, actionSocket, roomIndex, rooms);
        });
};

export default eventListener;