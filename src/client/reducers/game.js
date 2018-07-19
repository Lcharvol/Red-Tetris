import { map } from 'ramda';

import {
    START_GAME,
    END_GAME,
} from '../actions/game';

const initialState = {
    isGameStarted: false,
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case START_GAME:
        return {...state, isGameStarted: true}
    case END_GAME:
        return {...state, isGameStarted: false}
    default:
        return state;
}
};
  
  export default reducer;