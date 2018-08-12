import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';

import Game from '../Game';
import { INITIAL_BOARD } from '../../../client/constants/board';
import { removeToast, emitToRoom, emitToSocket } from '../../socketIo/utils';

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

beforeAll((done) => {
  httpServer = http.createServer().listen();
  httpServerAddr = httpServer.listen().address();
  ioServer = ioBack(httpServer);
  done();
});

describe('models', () => {
    describe('Game', () => {

        describe('newToast', () => {
            it('Should return a rnew toast', () => {
                const gameName = 'room1';
                const fakeMessage = 'fakeMessage'
                const res = Game.newToast(ioServer, gameName, fakeMessage);
                expect(res).toBeDefined();
            });
        });

        describe('deleteRoom', () => {
            it('Should return rooms without the given room', () => {
                const rooms = [
                    {
                        id: 0
                    },
                    {
                        id: 1
                    }
                ];
                const id = 0;
                const expectedRes = [
                    {
                        id: 1
                    }
                ]
                const res = Game.deleteRoom(rooms, id);
                expect(res).toEqual(expectedRes);
            });
        });

        describe('addRoom', () => {
            it('Should return rooms without the given room', () => {
                const rooms = [];
                const users = ['charvol', 'lcharvol2'];
                const roomName = 'room1'
                const expectedRes = [
                    {
                        displayModal: false,
                        errorMessage: undefined,
                        isGameStarted: false,
                        modal:{
                            display: false,
                            message: "",
                        },
                        roomName: "room1",
                        toasts: [],
                        users: [
                            "charvol",
                            "lcharvol2",
                        ],
                    }
                ]
                const res = Game.addRoom(rooms, users, roomName);
                expect(res).toEqual(expectedRes);
            });
        });

        describe('move', () => {
            it('Should return the initial room', () => {
                const socket = {

                }
                const io = {
                    emit: jest.fn(),
                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'bottom'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: false,
                        users: [
                            {
                                name: 'charvol'
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, io, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });

            it('Should return the room after a bottom move', () => {
                const socket = {

                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'bottom'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: true,
                        users: [
                            {
                                name: 'charvol',
                                board: INITIAL_BOARD,
                                activePiece: {
                                    posX: 0,
                                    posY: 0,
                                    version: 0,
                                    piece: []
                                },
                                win: true
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, ioServer, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });

            it('Should return the room after a bottom move', () => {
                const socket = {

                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'bottom'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: true,
                        users: [
                            {
                                name: 'charvol',
                                board: INITIAL_BOARD,
                                activePiece: {
                                    posX: 0,
                                    posY: 0,
                                    version: 0,
                                    piece: []
                                },
                                win: undefined
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, ioServer, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });

            it('Should return the room after a right move', () => {
                const socket = {

                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'right'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: true,
                        users: [
                            {
                                name: 'charvol',
                                board: INITIAL_BOARD,
                                activePiece: {
                                    posX: 0,
                                    posY: 0,
                                    version: 0,
                                    piece: []
                                }
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, ioServer, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });

            it('Should return the room after a left move', () => {
                const socket = {

                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'left'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: true,
                        users: [
                            {
                                name: 'charvol',
                                board: INITIAL_BOARD,
                                activePiece: {
                                    posX: 0,
                                    posY: 0,
                                    version: 0,
                                    piece: []
                                }
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, ioServer, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });

            it('Should return the room after a rotate move', () => {
                const socket = {

                }
                const actionSocket = {
                    user: 'charvol',
                    type: 'rotate'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: true,
                        users: [
                            {
                                name: 'charvol',
                                board: INITIAL_BOARD,
                                activePiece: {
                                    posX: 0,
                                    posY: 0,
                                    version: 0,
                                    piece: []
                                }
                            }
                        ]
                    }
                ];
                const res = Game.move(socket, ioServer, actionSocket, roomIndex, rooms);
                expect(res).toEqual(rooms[0]);
            });
        });

        describe('startGame', () => {
            it('Should return a proper room with started game', () => {
                const actionSocket = {
                    user: 'charvol',
                    type: 'bottom'
                };
                const roomIndex = 0;
                const rooms = [
                    {
                        isGameStarted: false,
                        users: [
                            {
                                name: 'charvol'
                            }
                        ]
                    }
                ];
                const expectedRes = {
                    isGameStarted: true,
                    users: [
                        {
                            name: 'charvol'
                        }
                    ]
                };
                Game.startGame(ioServer, actionSocket, roomIndex, rooms)
                    .then(res => {
                        expect(res).toEqual(expectedRes);
                        expect(emitToRoom).toHaveBeenCalledTimes(1);
                    })
            });
        });
    });
});