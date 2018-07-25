import { map, reverse, length } from 'ramda';

import { pieces } from './constants/pieces';
import { CELLS_COLORS, FAKE_CELL_COLOR } from '../client/constants/colors';
import { BOARD_LENGTH, BOARD_WIDTH } from '../client/constants/board';
import { INITIAL_CELL } from '../client/constants/cell';

export const getCellColor = () => CELLS_COLORS[getRandomNumber(0, length(CELLS_COLORS) - 1)];

export const getRandomNumber = (min , max) => {
    return Math.round(min + Math.random() * (max - min));
};

const getRandomPiece = () => pieces[getRandomNumber(0, 6)];

const setAllCellsInactive = board => board.map((cell, id) => {
    if(cell.active)
        board[id].active = false;
});


export const addRandomPiece = board => {
    const newPiece = getRandomPiece();
    const newBoard = [...board];
    const newValue = getRandomNumber(1, 1000);
    const newColor = getCellColor();
    newPiece.map((value, id) => {
        if(value === 0) return
        let newId = (id % 4) + (10 * Math.floor(id / 4)) + Math.floor(10 / 3);
        newBoard[newId] = {
            value: newValue,
            color: value === 0 ? FAKE_CELL_COLOR : newColor,
            active: newValue === 0 ? false : true,
        };
    })
    return newBoard;
};

export const moveBottom = board => {
    const newBoard = [...board];
    let idToDelete = [];
    let canMove = true;
    board.map((cell, id) => {
        let { active } = cell;
        let onLastLine = id >= (BOARD_LENGTH - BOARD_WIDTH);
        let isBlocked = onLastLine || !board[id + BOARD_WIDTH].active && board[id + BOARD_WIDTH].value !== 0;
        if(active && isBlocked) {
            setAllCellsInactive(board);
            canMove = false;
        }
    })
    if(!canMove) return addRandomPiece(newBoard);
    reverse(newBoard).map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        if(value !== 0) {
            let reversedId = BOARD_LENGTH - id - 1;
            if(reversedId - BOARD_WIDTH < 0 || board[reversedId - BOARD_WIDTH].value === 0)
                idToDelete = [...idToDelete, reversedId]
            if(reversedId + BOARD_WIDTH < BOARD_LENGTH)
                newBoard[reversedId + BOARD_WIDTH] = board[reversedId]
        }
    });
    map(id => {
        newBoard[id] = INITIAL_CELL;
    },idToDelete);
    // checkBoard(newBoard);
    return newBoard;
}