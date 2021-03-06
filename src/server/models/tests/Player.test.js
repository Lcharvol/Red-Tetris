import Player from '../Player';
import { INITIAL_BOARD } from '../../../client/constants/board';
import {
    removeToast,
    emitToRoom,
    emitToSocket,
} from '../utils';
import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';

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

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    });
    socket.on('connect', () => {
        done();
    });
});

describe('models', () => {
    describe('Player', () => {

        describe('joinRoom', () => {
            it('Should not join the full room', () => {
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
                            },
                            {
                                name: 'charvol2'
                            }
                        ],
                        roomName: 'room1'
                    }
                ];
                const expectedRes = rooms;
                const currentSocketId = [1];
                const data = {
                    roomName: 'room1',
                    user: 'lcharvol3'
                };
                const res = Player.joinRoom(socket, ioServer, data, rooms, currentSocketId)
                expect(res).toEqual(expectedRes);
            });
        });

        describe('joinRoom', () => {
            it('Should not join the room because the game is started', () => {
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
                                name: 'charvol'
                            },
                        ],
                        roomName: 'room1'
                    }
                ];
                const expectedRes = rooms;
                const currentSocketId = [1];
                const data = {
                    roomName: 'room1',
                    user: 'lcharvol3'
                };
                const res = Player.joinRoom(socket, ioServer, data, rooms, currentSocketId)
                expect(res).toEqual(expectedRes);
            });
        });

        describe('joinRoom', () => {
            it('Should join the room', () => {
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
                            },
                        ],
                        roomName: 'room1'
                    }
                ];
                const expectedRes = rooms;
                const currentSocketId = [1];
                const data = {
                    roomName: 'room1',
                    user: 'lcharvol3'
                };
                const fakeSocket = {
                    join: jest.fn(),
                }
                const res = Player.joinRoom(fakeSocket, ioServer, data, rooms, currentSocketId)
                expect(res).toEqual(expectedRes);
            });
        });

        describe('disconect', () => {
            it('Should disconnect and delete the room', () => {
                const rooms = [
                    {
                        isGameStarted: false,
                        users: [
                            {
                                id: 0,
                                name: 'charvol'
                            },
                        ],
                        roomName: 'room1'
                    }
                ];
                const expectedRes = [];
                const fakeSocket = {
                    join: jest.fn(),
                    leave: jest.fn(),
                };
                const socketIdToDelete = [0];
                const res = Player.disconnect(fakeSocket, ioServer, rooms, socketIdToDelete)
                expect(res).toEqual(expectedRes);
            });
        });

        describe('disconect', () => {
            it('Should disconnect and left one player in the room', () => {
                const rooms = [
                    {
                        isGameStarted: false,
                        users: [
                            {
                                id: 0,
                                name: 'lcharvol'
                            },
                            {
                                id: 1,
                                name: 'lcharvol2'
                            }
                        ],
                        roomName: 'room1'
                    }
                ];
                const expectedRes = [
                    {
                        isGameStarted: false,
                        roomName: "room1",
                        users: [
                            {
                                id: 1,
                                name: "lcharvol2",
                                owner: true
                            }
                        ]
                    }
                ]
                const fakeSocket = {
                    join: jest.fn(),
                    leave: jest.fn(),
                };
                const socketIdToDelete = [0];
                const res = Player.disconnect(fakeSocket, ioServer, rooms, socketIdToDelete)
                expect(res).toEqual(expectedRes);
            });
        });
    });
});