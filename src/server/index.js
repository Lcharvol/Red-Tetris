
import debug from 'debug';

import initHttp from './http';
import config from '../../config/server/index'

const logger = debug('tetris:server');

const init = async () => {
    try {
        let ctx = {config: {...config, startTime: new Date(), rooms: [] }};
        ctx = await initHttp(ctx);
        logger(`Server started at ${ctx.config.startTime.toString().substr(0, 25)}`);
    } catch (err) {
        logger(err.stack);
    }
};

init();