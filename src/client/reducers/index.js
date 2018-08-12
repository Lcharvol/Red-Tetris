import {
    omit,
    without,
    drop,
    findIndex,
    propEq
} from 'ramda';
import {
    SET_MODAL_MESSAGE,
    DELETE_MODAL_MESSAGE,
    UPDATE_GAME_INFO,
    REMOVE_TOAST,
    SET_ERROR_MESSAGE,
} from '../actions/game';

const initialState = {
    isGameStarted: false,
    gameDecount: false,
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
            if(action.body.toasts)
                return {
                    ...state,
                    ...omit(['toasts'],action.body),
                    toasts: [...state.toasts, ...action.body.toasts]
                }
            return {...state, ...action.body}
        case REMOVE_TOAST:
            let newToasts = [...state.toasts];
            if(!newToasts[0].active)
                newToasts = drop(1, newToasts);
            const toastIndex = findIndex(propEq('id', action.toastId))(newToasts);

            if(toastIndex >= 0) 
                newToasts[toastIndex].active = false;
            return {...state, toasts: newToasts };
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.message};
        default:
            return state;
    }
};
  
  export default reducer;