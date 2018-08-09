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

afterAll((done) => {
  ioServer.close();
  httpServer.close();
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

afterEach((done) => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('Http utils', () => {
    test('should communicate', (done) => {
        ioServer.emit('echo', 'Hello World');
        socket.once('echo', (message) => {
        expect(message).toBe('Hello World');
        done();
        });
        ioServer.on('connection', (mySocket) => {
        expect(mySocket).toBeDefined();
        });
    });

    describe('removeToast:', () => {
        test('should emit a toast after the TOAST_DURATION', () => {
            const fakeRoom = 'fakeRoom';
            const res = removeToast(ioServer, fakeRoom);
            const expectedRes = 20;

            expect(res).toBe(expectedRes);
        });
    });

    describe('emitToRoom:', () => {
        test('should emit to a room', () => {
            const fakeRoom = 'fakeRoom';
            const type = 'action';
            const name = 'charvol';
            const body = {};
            const res = emitToRoom(ioServer, fakeRoom, type, name, body);

            expect(res).toBeDefined();
        });
    });

    describe('emitToSocket:', () => {
        test('should emit to a socket', () => {
            const fakeRoom = 'fakeRoom';
            const type = 'action';
            const name = 'charvol';
            const message = 'fakeMessage'
            const res = emitToSocket(socket, fakeRoom, type, name, message);

            expect(res).toBeDefined();
        });
    });
});