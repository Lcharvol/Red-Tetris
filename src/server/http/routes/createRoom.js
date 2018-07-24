/* eslint-disable */
import _ from 'lodash';
import debug from 'debug';

const logger = debug('tetris:room');

export const createRoom = async (req, res) => {
  try {
    const { body: { name, user } } = req;
    req.ctx = {...req.ctx, rooms: [...req.ctx.rooms, {name, user}]}
    res.json({ details: 'Room succesfully created' });
    logger(`${name} room has been created by ${user}`);
    next();
  }
  catch(err) {
      console.log('err: ', err)
    req.Err('Failed to create room');
  }
};
export default createRoom;