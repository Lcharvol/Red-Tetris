import { map } from 'ramda';

import {
    START_GAME,
    END_GAME,
    SET_MODAL_MESSAGE,
    DELETE_MODAL_MESSAGE,
    UPDATE_GAME_INFO,
} from '../actions/game';

const initialState = {
    isGameStarted: false,
    displayModal: false,
    modalMessage: '',
    me: undefined,
    gameName: undefined,
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case START_GAME:
        return {...state, isGameStarted: true};
    case END_GAME:
        return {...state, isGameStarted: false};
    case SET_MODAL_MESSAGE:
        return {...state, displayModal: true, modalMessage: action.message};
    case DELETE_MODAL_MESSAGE:
        return {...state, displayModal: false, modalMessage: ''}
    case UPDATE_GAME_INFO:
        return {...state, ...action.body}
    default:
        return state;
}
};
  
  export default reducer;