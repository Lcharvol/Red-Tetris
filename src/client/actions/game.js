export const SET_MODAL_MESSAGE = 'SET_MODAL_MESSAGE';

export const DELETE_MODAL_MESSAGE = 'DELETE_MODAL_MESSAGE';

export const UPDATE_GAME_INFO = 'UPDATE_GAME_INFO';


export const setModalMessage = message => dispatch => dispatch(({ type: SET_MODAL_MESSAGE, message }));

export const deleteModalMessage = () => dispatch => dispatch(({ type: DELETE_MODAL_MESSAGE, message }));

export const updateGameInfo = body => dispatch => dispatch(({ type: UPDATE_GAME_INFO, body}));