import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import socketIO from 'socket.io-client';

import configureStore from './store';
import App from './containers/App';

const initialState = { io };
const store = configureStore(initialState, io);

const matchaToken = 'fakeToken';
const url = 'http://127.0.0.1:3004';
const io = socketIO.connect(url, { query: matchaToken ? `matchaToken=${matchaToken}` : null });

io.on('notif', (data) => {
  console.log('io data: ', data);
});

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('__REDTETRIS__'));