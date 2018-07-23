
import params  from '../../params';
import * as server from './index';
import debug from 'debug';

server.create(params.server).then( () => console.log('Server started') )