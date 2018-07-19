import { combineReducers } from 'redux';

import board from './board';

const reducer = combineReducers({
    board,
});

export default reducer;