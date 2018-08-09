
import initHttp from './http';
import initIo from './socketIo';

const run = ctx => initHttp(ctx).then(initIo);
export default run;