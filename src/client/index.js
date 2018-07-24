import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';

import configureStore from './store';
import App from './containers/App';

const initialState = {};
const store = configureStore(initialState, io);

const tetrisToken = 'fakeToken';
const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url, { query: tetrisToken ? `tetrisToken=${tetrisToken}` : null });

io.on('action', (data) => {
  console.log('data: ', data);
});

io.emit('join', { room: 'room1', user: 'lcharvol'});

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('__REDTETRIS__'));