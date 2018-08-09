import debug from 'debug';
import config from '../../config/server/index';
import run from './run';

const logger = debug('tetris');

run({ config })
  .then(ctx => logger(`Server started: `,ctx))
  .catch(console.error); // eslint-disable-line no-console
