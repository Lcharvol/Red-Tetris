import { combineReducers } from 'redux';

import boards from './boards';
import game from './game';

const reducer = combineReducers({
    boards,
    game,
});

export default reducer;