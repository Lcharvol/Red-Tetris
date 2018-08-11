import eventListener from '../eventListener';
import io from 'socket.io-client';
import http from 'http';
import ioBack from 'socket.io';
import Player from '../../models/Player';

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
afterEach((done) => {
    // Cleanup
    if (socket.connected) {
        socket.disconnect();
    }
    done();
});

describe('scoket.io', () => {
    describe('eventListener', () => {
        it('Should handle event', () => {
             // once connected, emit Hello World
            ioServer.emit('echo', 'Hello World');
            socket.once('disconect', (message) => {
                // Check that the message matches
                expect(message).toBe('Hello World');
                done();
            });
            ioServer.on('disconnect', (mySocket) => {
                expect(Player.disconnect).toHaveBeenCall();
            });
        });
    });
});