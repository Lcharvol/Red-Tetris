import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import App from './containers/App';

const initialState = {
    boards: {
        myBoard : []
    }
};
const store = configureStore(initialState);

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('__REDTETRIS__'));