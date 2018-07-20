import { map, reverse } from 'ramda';

import { BOARD_WIDTH, BOARD_LENGTH } from '../constants/board';
import { INITIAL_CELL } from '../constants/cell';

export const MOVE_TOP = 'MOVE_TOP';
export const MOVE_BOTTOM = 'MOVE_BOTTOM';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const ADD_PIECE = 'ADD_PIECE';

export const rotate = board => {
    const newBoard = board;
    return newBoard;
};

const setAllCellsInactive = board => board.map((cell, id) => {
    if(cell.active)
        board[id].active = false;
});

export const moveBottom = board => {
    const newBoard = [...board];
    let idToDelete = [];
    reverse(newBoard).map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        if(value !== 0) {
            let reversedId = BOARD_LENGTH - id - 1;
            let onLastLine = reversedId >= (BOARD_LENGTH - BOARD_WIDTH);
            let isBlocked = onLastLine || (board[reversedId + BOARD_WIDTH].active && board[reversedId + BOARD_WIDTH].value !== value) || (!board[reversedId + BOARD_WIDTH].active && board[reversedId + BOARD_WIDTH].value !== 0);
            if(active && isBlocked)
                setAllCellsInactive(board);
            if(reversedId - BOARD_WIDTH < 0 || board[reversedId - BOARD_WIDTH].value === 0)
                idToDelete = [...idToDelete, reversedId]
            if(reversedId + BOARD_WIDTH < BOARD_LENGTH)
                newBoard[reversedId + BOARD_WIDTH] = board[reversedId]
        }
    });
    map(id => {
        newBoard[id] = INITIAL_CELL;
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