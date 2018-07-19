import { combineReducers } from 'redux';

import boards from './boards';

const reducer = combineReducers({
    boards,
});

export default reducer;