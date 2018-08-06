import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import { equals, isNil } from 'ramda';

import configureStore from './store';
import App from './containers/App';
import {
  startGame,
  updateGameInfo,
  setModalMessage,
  removeToast,
  setErrorMessage,
} from './actions/game';
import { getRoomName, getUser, getParsedGameUrl } from './utils';

const initialState = {};
const store = configureStore(initialState, io);

const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url);

const gameUrl = window.location.href;
const { hash } = getParsedGameUrl(gameUrl);

const roomName = getRoomName(hash);
const user = getUser(hash);

console.log('hash: ', hash);

console.log('user: ', user);

console.log('roomName: ', roomName);

io.on('action', data => {
  const { name } = data;
  if(equals(name,'startGame')) store.dispatch(startGame());
  if(equals(name,'updateGameInfo')) store.dispatch(updateGameInfo(data.body));
  if(equals(name,'removeToast')) store.dispatch(removeToast());
});

io.on('gameError', data => {
  const { name, message } = data;
  store.dispatch(setErrorMessage(message))
})

if(!isNil(user))
  store.dispatch(updateGameInfo({me: user}));

if(!isNil(user) && !isNil(roomName))
  io.emit('joinRoom', {roomName, user});

export const Root = () => (
    <Provider store={store}>
      <App io={io}/>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('__REDTETRIS__'));