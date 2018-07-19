import { map, reverse } from 'ramda';

import { BOARD_WIDTH, BOARD_LENGTH } from '../constants/board';

export const MOVE_TOP = 'MOVE_TOP';
export const MOVE_BOTTOM = 'MOVE_BOTTOM';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const ADD_PIECE = 'ADD_PIECE';

export const moveTop = board => {
    const newBoard = board;
    return newBoard;
};

export const moveBottom = board => {
    const newBoard = [...board];
    let idToDelete = [];
    reverse(newBoard).map((value, id) => {
        if(value !== 0) {
            let reversedId = BOARD_LENGTH - id - 1;
            if(reversedId - BOARD_WIDTH < 0 || board[reversedId - BOARD_WIDTH] === 0) {
                idToDelete = [...idToDelete, reversedId]
            }
            if(reversedId + BOARD_WIDTH <= BOARD_LENGTH) {
                newBoard[reversedId + BOARD_WIDTH] = board[reversedId]
            }
        }
    });
    map(id => {
        newBoard[id] = 0;
    },idToDelete)
    return newBoard;
}

export const moveRight = board => {
    const newBoard = board;
    return newBoard;
}

export const moveLeft = board => {
    const newBoard = board;
    return newBoard;
}

export const move = event => (dispatch) => {
    const { key } = event
    if (key === 'ArrowUp') {
        dispatch(({ type: ADD_PIECE }));
    };
    if (key === 'ArrowDown') {
        dispatch(({ type: MOVE_BOTTOM }));
    };
    if (key === 'ArrowLeft') {
        dispatch(({ type: MOVE_LEFT }));
    };
    if (key === 'ArrowRight') {
        dispatch(({ type: MOVE_RIGHT }));
    };
}