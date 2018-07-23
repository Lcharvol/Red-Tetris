export const START_GAME = 'START_GAME';

export const END_GAME = 'END_GAME';

export const SET_MODAL_MESSAGE = 'SET_MODAL_MESSAGE';

export const DISPLAY_MODAL = 'DISPLAY_MODAL';


export const startGame = () => (dispatch) => dispatch(({ type: START_GAME }));

export const setModalMessage = message => dispatch => dispatch(({ type: SET_MODAL_MESSAGE, message }));

export const displayModal = () => dispatch => dispatch(({ type: DISPLAY_MODAL }));