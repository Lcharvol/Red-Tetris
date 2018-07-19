export const ADD_PIECE = 'ADD_PIECE';

export const addPiece = () => (dispatch) => dispatch(({ type: ADD_PIECE }));

const getRandomPiece = () => {};

export const addRandomPiece = board => {
    const newBoard = [...board];
    return newBoard;
};