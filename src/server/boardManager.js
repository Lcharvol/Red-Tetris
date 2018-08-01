import { map, drop, reverse, length } from 'ramda';

import { pieces } from './constants/pieces';
import { CELLS_COLORS, FAKE_CELL_COLOR } from '../client/constants/colors';
import { BOARD_LENGTH, BOARD_WIDTH } from '../client/constants/board';
import { INITIAL_CELL } from '../client/constants/cell';

const deletLine = (board, line) => {
    board.map((cell, id) => {
        if(Math.floor(id / BOARD_WIDTH) === line)
            board[id] = INITIAL_CELL;
    })
    return board;
};

const checkBoard = board => {
    let actualLine = 0;
    let fullLine = true;
    board.map((cell, id) => {
        if(cell.value === 0 && !cell.active)
            fullLine = false;
        if((id + 1) % BOARD_WIDTH === 0) {
            if(fullLine) {
                board = deletLine(board, actualLine);
            }
            fullLine = true;
            actualLine += 1;
        }
    })
    return board;
};

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

export const addPiece = (board, piece) => {
    const newBoard = [...board];
    const newValue = getRandomNumber(1, 1000);
    const newColor = getCellColor();
    piece.map((value, id) => {
        if(value === 0) return
        let newId = (id % 4) + (10 * Math.floor(id / 4)) + Math.floor(10 / 3);
        if(newBoard[newId].value !== 0) {
            throw new Error('cant add');
        }
        newBoard[newId] = {
            value: newValue,
            color: value === 0 ? FAKE_CELL_COLOR : newColor,
            active: newValue === 0 ? false : true,
        };
    })
    return newBoard;
};

export const moveBottom = (board, pieces) => {
    let newBoard = [...board];
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
    if(!canMove) {
        try {
            const enhancedBoard = addPiece(newBoard, pieces[0]);
            return {
                board: enhancedBoard,
                pieces: drop(1, pieces),
                win: null,
            }
        } catch (e) {
            return {
                board,
                pieces,
                win: false,
            }
        }
    }
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
    newBoard = checkBoard(newBoard);
    return {
        board: newBoard,
        pieces,
    };
};

export const moveRight = board => {
    const newBoard = [...board];
    let idToDelete = [];
    let canMove = true;
    board.map((cell, id) => {
        let { active } = cell;
        let onLastColumn = (id + 1) % BOARD_WIDTH === 0;
        let isBlocked = onLastColumn || !board[id + 1].active && board[id + 1].value !== 0;
        if(active && isBlocked) canMove = false;
    })
    if(!canMove) return board;
    reverse(newBoard).map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        let reversedId = BOARD_LENGTH - id - 1;
        if(board[reversedId - 1].value === 0)
            idToDelete = [...idToDelete, reversedId];
        newBoard[reversedId + 1] = board[reversedId];
    });
    map(id => {
        newBoard[id] = INITIAL_CELL;
    },idToDelete)
    return newBoard;
};

export const moveLeft = board => {
    const newBoard = [...board];
    let idToDelete = [];
    let canMove = true;
    board.map((cell, id) => {
        let { active } = cell;
        let onFirstColumn = id % BOARD_WIDTH === 0;
        let isBlocked = onFirstColumn || !board[id - 1].active && board[id - 1].value !== 0;
        if(active && isBlocked) canMove = false;
    })
    if(!canMove) return board;
    newBoard.map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        if(board[id + 1].value === 0)
            idToDelete = [...idToDelete, id];
        newBoard[id - 1] = board[id];
    });
    map(id => {
        newBoard[id] = INITIAL_CELL;
    },idToDelete)
    return newBoard;
};