import { pieces } from '../constants/pieces';
import { BOARD_WIDTH } from '../constants/board';

export const ADD_PIECE = 'ADD_PIECE';

export const addPiece = () => (dispatch) => dispatch(({ type: ADD_PIECE }));

const getRandomPiece = () => {
    const min = 0;
    const max = 6;
    const rand = Math.round(min + Math.random() * (max - min));
    return pieces[rand];
};

export const addRandomPiece = board => {
    const newPiece = getRandomPiece();
    const newBoard = [...board];
    newPiece.map((value, id) => {
        let newId = (id % 4) + (10 * Math.floor(id / 4)) + Math.floor(BOARD_WIDTH / 3);
        newBoard[newId] = value;
    })
    return newBoard;
};