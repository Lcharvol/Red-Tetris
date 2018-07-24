
import debug from 'debug';

import initHttp from './http';
import config from '../../config/server/index'

const logger = debug('tetris:server/index.js');

const init = async () => {
    try {
        let ctx = {config};
        ctx = await initHttp(ctx);
    } catch (err) {
        logger(err.stack);
    }
};

init();