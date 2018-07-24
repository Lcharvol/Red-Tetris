import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';
import parse from 'url-parse';

import configureStore from './store';
import App from './containers/App';
import { startGame } from './actions/game';

const initialState = {};
const store = configureStore(initialState, io);

const tetrisToken = 'fakeToken';
const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url, { query: tetrisToken ? `tetrisToken=${tetrisToken}` : null });

const gameUrl = window.location.href;
const parsedGameUrl = parse(gameUrl);
const { hash } = parsedGameUrl;

const getRoomName = str => {
  const lastCharPos = str.indexOf('[')
  return str.substr(1, lastCharPos - 1);
};

const getUser = str => {
  const lastCharPos = str.indexOf('[')
  return str.substr(1, str.length);
}

const room = getRoomName(hash);
const user = getUser(hash);

io.on('action', (data) => {
  const { name } = data;
  if(name === 'startGame') {
    store.dispatch(startGame());
  }
});


io.emit('room', {room, user});

const Root = () => (
    <Provider store={store}>
      <App io={io}/>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('__REDTETRIS__'));