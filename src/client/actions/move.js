import { map, reverse } from 'ramda';

import { BOARD_WIDTH, BOARD_LENGTH } from '../constants/board';
import { INITIAL_CELL } from '../constants/cell';
import { addRandomPiece } from './piece';

export const MOVE_TOP = 'MOVE_TOP';
export const MOVE_BOTTOM = 'MOVE_BOTTOM';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const ADD_PIECE = 'ADD_PIECE';

export const rotate = board => {
    const newBoard = board;
    return newBoard;
};

const deletLine = (board, line) => {
    board.map((cell, id) => {
        if(Math.floor(id / BOARD_WIDTH) === line)
            board[id] = INITIAL_CELL;
    })
    return board;
}

const setAllCellsInactive = board => board.map((cell, id) => {
    if(cell.active)
        board[id].active = false;
});

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
}

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
    checkBoard(newBoard);
    return newBoard;
}

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
}

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
}

export const move = (event, io, me, roomName) => (dispatch) => {
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
        io.emit('action', { name: 'moveRight', gameName: roomName, user: me })
        // dispatch(({ type: MOVE_RIGHT }));
    };
}

export const moveCycle = () => dispatch => dispatch(({ type: MOVE_BOTTOM }));