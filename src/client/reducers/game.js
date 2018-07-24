import { map } from 'ramda';

import {
    START_GAME,
    END_GAME,
    SET_MODAL_MESSAGE,
    DISPLAY_MODAL,
    UPDATE_GAME_INFO,
} from '../actions/game';

const initialState = {
    isGameStarted: false,
    displayModal: false,
    modalMessage: '',
    gameInfo: {
        me: undefined,
    },
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case START_GAME:
        return {...state, isGameStarted: true};
    case END_GAME:
        return {...state, isGameStarted: false};
    case SET_MODAL_MESSAGE:
        return {...state, modalMessage: action.message};
    case DISPLAY_MODAL:
        return {...state, displayModal: !state.displayModal};
    case UPDATE_GAME_INFO:
        return {...state, gameInfo: {...state.gameInfo, ...action.body}}
    default:
        return state;
}
};
  
  export default reducer;