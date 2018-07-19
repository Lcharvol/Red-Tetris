import { length } from 'ramda';

import { pieces } from '../constants/pieces';
import { BOARD_WIDTH } from '../constants/board';
import { CELLS_COLORS } from '../constants/colors';
import {
    getRandomNumber,
} from '../utils';

export const ADD_PIECE = 'ADD_PIECE';

export const addPiece = () => (dispatch) => dispatch(({ type: ADD_PIECE }));

const getRandomPiece = () => pieces[getRandomNumber(0, 6)];

export const addRandomPiece = board => {
    const newPiece = getRandomPiece();
    const newBoard = [...board];
    const newValue = getRandomNumber(1, length(CELLS_COLORS) - 1);
    newPiece.map((value, id) => {
        let newId = (id % 4) + (10 * Math.floor(id / 4)) + Math.floor(BOARD_WIDTH / 3);
        newBoard[newId] = value === 0 ? 0 : newValue;
    })
    return newBoard;
};