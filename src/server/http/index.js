import express from 'express';
import socketIo from 'socket.io';
import { findIndex, propEq, isNil, length } from 'ramda';
import bodyParser from 'body-parser';

import debug from 'debug';
import fs from 'fs';

import { getUrl, bindError, bindLogger, bindCtx } from './helpers';
import createRoom from './routes/createRoom';
import { initialBoard } from '../constants/board';
import {
    addRandomPiece,
    moveBottom,
    moveRight,
    moveLeft,
} from '../boardManager';

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
                if(roomIndex >= 0 && length(rooms[roomIndex].users) >= 2) {
                    socket.emit('gameError', { type: "fullRoom", message: 'This room is full'});
                    logger('To many player in the room');    
                } else {
                    socket.join(room);
                    const users = !isNil(rooms[roomIndex]) ? [...rooms[roomIndex].users, {name: user, owner: false, id: currentSocketId[0], board: initialBoard}] : [{name: user, owner: true, id: currentSocketId[0], board: initialBoard}];
                    if(roomIndex < 0) rooms = [...rooms, {users, turn: 0, name: room}]
                    else rooms[roomIndex] = {...rooms[roomIndex], users, name: room};   
                    io.to(room).emit('action', { name: 'updateGameInfo', body: { name: room, users }});
                    logger('Room "', room, '" joined by ', user);
                }
            })
            .on('disconnect', async () => {
                logger("Socket disconnected: " + currentSocketId)
                socketIdToDelete[0] = socket.id;
            })
            .on('action', function(actionSocket) {
                const roomIndex = findIndex(propEq('name', actionSocket.gameName))(rooms);
                if(actionSocket.name === 'startGame') {
                    if(roomIndex < 0) return;
                    io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'3'}});
                    setTimeout(() => io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'2'}}), 1000);
                    setTimeout(() => io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'1'}}), 2000);
                    setTimeout(() => io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: true, modalMessage:'GO'}}), 3000);
                    setTimeout(() => {
                        io.to(actionSocket.gameName).emit('action', {name: 'updateGameInfo', body: {displayModal: false, modalMessage:''}});
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
                        io.to(actionSocket.gameName).emit('action', {
                                name: 'updateGameInfo',
                                body: { 
                                    name: actionSocket.gameName,
                                    isGameStarted: true,
                                    users: newUsersBoard,
                                }
                            });
                        rooms[roomIndex] = {...rooms[roomIndex], users: newUsersBoard}
                        setInterval(() => {
                            rooms[roomIndex].turn += 1;
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
                            rooms[roomIndex] = {...rooms[roomIndex], users: newUsers}
                            io.to(actionSocket.gameName).emit('action', {
                                name: 'updateGameInfo',
                                body: {
                                    users: newUsers,
                                }
                            });
                        },500);
                        logger(`Game start in the room: \"${actionSocket.gameName}\"`)
                    }, 3500);
                };
                if(actionSocket.name === 'joinRoom') {
                    logger(`${actionSocket.user} join the room: ${actionSocket.room}`)
                };
                if(actionSocket.name === 'moveRight') {
                    const { user } = actionSocket;
                    const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
                    rooms[roomIndex].users[userRoomIndex].board = moveRight(rooms[roomIndex].users[userRoomIndex].board);
                    io.to(actionSocket.gameName).emit('action', {
                        name: 'updateGameInfo',
                        body: {
                            users: rooms[roomIndex].users,
                        }
                    });
                }
                if(actionSocket.name === 'moveLeft') {
                    const { user } = actionSocket;
                    const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
                    rooms[roomIndex].users[userRoomIndex].board = moveLeft(rooms[roomIndex].users[userRoomIndex].board);
                    io.to(actionSocket.gameName).emit('action', {
                        name: 'updateGameInfo',
                        body: {
                            users: rooms[roomIndex].users,
                        }
                    });
                }
                if(actionSocket.name === 'moveBottom') {
                    const { user } = actionSocket;
                    const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
                    rooms[roomIndex].users[userRoomIndex].board = moveBottom(rooms[roomIndex].users[userRoomIndex].board);
                    io.to(actionSocket.gameName).emit('action', {
                        name: 'updateGameInfo',
                        body: {
                            users: rooms[roomIndex].users,
                        }
                    });
                }
                if(actionSocket.name === 'move') {
                    const { user, type } = actionSocket;
                    const userRoomIndex = findIndex(propEq('name', user))(rooms[roomIndex].users);
                    if(type === 'bottom')
                        rooms[roomIndex].users[userRoomIndex].board = moveBottom(rooms[roomIndex].users[userRoomIndex].board);
                    if(type === 'right')
                        rooms[roomIndex].users[userRoomIndex].board = moveRight(rooms[roomIndex].users[userRoomIndex].board);
                    if(type === 'left')
                        rooms[roomIndex].users[userRoomIndex].board = moveLeft(rooms[roomIndex].users[userRoomIndex].board);
                    io.to(actionSocket.gameName).emit('action', {
                        name: 'updateGameInfo',
                        body: {
                            users: rooms[roomIndex].users,
                        }
                    });
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