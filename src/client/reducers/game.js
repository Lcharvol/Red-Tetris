import { without, drop } from 'ramda';
import {
    SET_MODAL_MESSAGE,
    DELETE_MODAL_MESSAGE,
    UPDATE_GAME_INFO,
    REMOVE_TOAST,
    SET_ERROR_MESSAGE,
} from '../actions/game';

const initialState = {
    isGameStarted: false,
    displayModal: false,
    toasts: [],
    modalMessage: '',
    errorMessage: undefined,
    me: undefined,
    gameName: undefined,
};

const reducer = (state = initialState, action) => {
switch (action.type) {
    case SET_MODAL_MESSAGE:
        return {...state, displayModal: true, modalMessage: action.message};
    case DELETE_MODAL_MESSAGE:
        return {...state, displayModal: false, modalMessage: ''};
    case UPDATE_GAME_INFO:
        if(action.body.toast)
            return {...state, ...action.body, toasts: [...state.toasts, action.body.toast]};
        return {...state, ...action.body}
    case REMOVE_TOAST:
        return {...state, toasts: drop(1,state.toasts)};
    case SET_ERROR_MESSAGE:
        return {...state, errorMessage: action.message};
    default:
        return state;
}
};
  
  export default reducer;