import {
    map,
    drop,
    reverse,
    length,
    subtract,
    add,
    times,
    inc,
} from 'ramda';

import { pieces } from './constants/pieces';
import { CELLS_COLORS, FAKE_CELL_COLOR } from '../client/constants/colors';
import { BOARD_LENGTH, BOARD_WIDTH } from '../client/constants/board';
import { INITIAL_CELL } from '../client/constants/cell';
import Piece from './models/Piece';

const deleteLine = (board, line) => {
    const newBoard = [...board];
    times(len => {
        newBoard[(line * BOARD_WIDTH) + len] = INITIAL_CELL;
    } ,BOARD_WIDTH);
    return newBoard;
};

const goDown = (board, line) => {
    const newBoard = [...board];
    let idToDelete = [];
    times(id => {
        if(board[id] !== 0) {
            newBoard[id + BOARD_WIDTH] = board[id];
            if(id > BOARD_WIDTH && board[id - BOARD_WIDTH] === 0)
                idToDelete = [...idToDelete];
        }
    },inc(line * BOARD_WIDTH));
    map(id => {
        newBoard[id] = INITIAL_CELL;
    },idToDelete);
    return newBoard;
}

const checkBoard = board => {
    let newBoard = [...board];
    let actualLine = 0;
    let fullLine = true;
    board.map((cell, id) => {
        if(cell.value === 0 && !cell.active)
            fullLine = false;
        if((id + 1) % BOARD_WIDTH === 0) {
            if(fullLine)
            newBoard = goDown(deleteLine(newBoard, actualLine),actualLine);
            fullLine = true;
            actualLine += 1;
        }
    })
    return newBoard;
};

export const moveBottom = (board, pieces) => {
    let newBoard = [...board];
    let idToDelete = [];
    let canMove = true;

    board.map((cell, id) => {
        let { active } = cell;
        let onLastLine = id >= subtract(BOARD_LENGTH, BOARD_WIDTH);
        let isBlocked = onLastLine || !board[id + BOARD_WIDTH].active && board[add(id,BOARD_WIDTH)].value !== 0;
        if(active && isBlocked) {
            Piece.setAllCellsInactive(board);
            canMove = false;
        }
    })
    if(!canMove) {
        newBoard = checkBoard(newBoard);
        try {
            const enhancedBoard = Piece.addPiece(newBoard, pieces[0]);
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
        let { value, active } = cell;
        if(!active) return cell
        if(value !== 0) {
            let reversedId = BOARD_LENGTH - id - 1;
            if(reversedId - BOARD_WIDTH < 0 || board[reversedId - BOARD_WIDTH].value === 0)
                newBoard[reversedId] = INITIAL_CELL;
            if(reversedId + BOARD_WIDTH < BOARD_LENGTH)
                newBoard[reversedId + BOARD_WIDTH] = board[reversedId]
        }
    });
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