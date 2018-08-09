import socketIo from 'socket.io';
import debug from 'debug';

import eventListener from './eventListener';
import { CONNECTION } from '../constants/eventsTypes';

const logger = debug('tetris:io');

const init = ctx => {
    const promise = new Promise((resolve) => {
        const io = socketIo(ctx.http);
        io.on(CONNECTION, async socket => {
            eventListener(socket, io);
        });
        logger('Socket.io initialized');
        resolve({ ...ctx, io });
    });

    return promise;
};

export default init;