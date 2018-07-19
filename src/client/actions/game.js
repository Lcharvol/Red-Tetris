export const START_GAME = 'START_GAME';
export const END_GAME = 'END_GAME';

export const startGame = () => (dispatch) => dispatch(({ type: START_GAME }));