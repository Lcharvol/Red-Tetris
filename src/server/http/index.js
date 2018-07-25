import express from 'express';
import socketIo from 'socket.io';
import { findIndex, propEq } from 'ramda';
import bodyParser from 'body-parser';

import debug from 'debug';
import fs from 'fs';

import { getUrl, bindError, bindLogger, bindCtx } from './helpers';
import createRoom from './routes/createRoom';
import { initialBoard } from '../constants/board';

const logger = debug('tetris:http');
const logerror = debug('tetris:http:error');

let rooms = [];

const init = async ctx => {
    const app = await express();
    const { server: { host, port } } = ctx.config;
    const httpServer = await app.listen(port, host, () => {
      httpServer.url = getUrl(httpServer);
      logger(`Connected at this address: ${httpServer.url}`); // eslint-disable-line no-console
    });
  
    const io = socketIo(httpServer);
    const currentSocketId = [];
    const socketIdToDelete = [];
    const tmp = [];
    io.on('connection', function(socket){
        currentSocketId[0] = socket.id;
        logger("Socket connected: " + currentSocketId)
        socket
            .on('room', function(data) {
                const { room, user } = data;
                const roomIndex = findIndex(propEq('name', room))(rooms);
                if(roomIndex >= 0 && rooms[roomIndex].users.length >= 2) {
                    socket.emit('gameError', { type: "fullRoom", message: 'This room is full'});
                    logger('To many player in the room');    
                } else {
                    socket.join(room);
                    const users = rooms[roomIndex] ? [...rooms[roomIndex].users, {name: user, owner: false, id: currentSocketId[0]}] : [{name: user, owner: true, id: currentSocketId[0]}];
                    rooms[roomIndex] = {...rooms[roomIndex], users};
                    rooms = [...rooms, { name: room, users }];
                    io.to(room).emit('action', { name: 'updateGameInfo', body: { name: room, users }});
                    logger('Room "', room, '" joined by ', user);
                }
            })
            .on('disconnect', async () => {
                logger("Socket disconnected: " + currentSocketId)
                socketIdToDelete[0] = socket.id;
            })
            .on('action', function(actionSocket) {
                if(actionSocket.name === 'startGame') {
                    const roomIndex = findIndex(propEq('name', actionSocket.gameName))(rooms);
                    rooms[roomIndex].users[0] = initialBoard;
                    rooms[roomIndex].users[1] = initialBoard;
                    io.to(actionSocket.gameName).emit('action', { name: 'updateGameInfo', body: { name: actionSocket.gameName }});
                    logger(`Game start in the room: \"${actionSocket.gameName}\"`)
                };
                if(actionSocket.name === 'joinRoom') {
                    logger(`${actionSocket.user} join the room: ${actionSocket.room}`)
                }
            });
    });
    const handler = (req, res) => {
        const file = req.url === '/bundle.js' ? '/../../../build/bundle.js' : '/../../../public/index.html';
        fs.readFile(__dirname + file, (err, data) => {
            if (err) {
                logerror(err)
                res.writeHead(500)
                return res.end('Error loading index.html')
            }
            res.writeHead(200)
            res.end(data)
        })
    }
  
    await app
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: true }))
        .use(bindCtx(ctx))
        .use(bindError)
        .use('/', handler);
    return ({ ...ctx, http: httpServer });
  };
  
  export default init;