import {
    map,
    drop,
    reverse,
    length,
    subtract,
    add,
    times,
    inc,
    remove,
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
    let newLine = [];
    times(n => {
        newLine = [...newLine, INITIAL_CELL];
    },BOARD_WIDTH);
    return [...newLine, ...remove(line * BOARD_WIDTH, BOARD_WIDTH, newBoard)];
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

export const moveBottom = user => {
    const newUser = { ...user };
    const { board, pieces, activePiece } = newUser;
    let newBoard = [...board]
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
        try {
            let enhancedBoard = Piece.addPiece(newBoard, pieces[0]);
            enhancedBoard = checkBoard(enhancedBoard);
            return {
                ...newUser,
                board: enhancedBoard,
                pieces: drop(1, pieces),
                win: null,
                activePiece: {...pieces[0]},
            }
        } catch (e) {
            return {
                ...newUser,
                board: newBoard,
                pieces,
                win: false,
                activePiece: {...pieces[0]},
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
    newUser.activePiece.posY += 1;
    return {
        ...newUser,
        board: newBoard,
        pieces,
    };
};

export const moveRight = user => {
    const newUser = {...user};
    const { board, activePiece } = newUser;
    let idToDelete = [];
    let canMove = true;

    board.map((cell, id) => {
        let { active } = cell;
        let onLastColumn = (id + 1) % BOARD_WIDTH === 0;
        let isBlocked = onLastColumn || !board[id + 1].active && board[id + 1].value !== 0;
        if(active && isBlocked) canMove = false;
    })
    if(!canMove) return newUser;
    reverse(board).map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        let reversedId = BOARD_LENGTH - id - 1;
        if(reversedId % BOARD_WIDTH === 0 || !board[reversedId - 1].active)
            idToDelete = [...idToDelete, reversedId];
        board[reversedId + 1] = board[reversedId];
    });
    map(id => {
        board[id] = INITIAL_CELL;
    },idToDelete);
    activePiece.posX += 1;
    return newUser;
};

export const moveLeft = user => {
    const newUser = {...user};
    const { board, activePiece } = newUser;
    let idToDelete = [];
    let canMove = true;
    board.map((cell, id) => {
        let { active } = cell;
        let onFirstColumn = id % BOARD_WIDTH === 0;
        let isBlocked = onFirstColumn || !board[id - 1].active && board[id - 1].value !== 0;
        if(active && isBlocked) canMove = false;
    })
    if(!canMove) return newUser;
    board.map((cell, id) => {
        let { value, active} = cell;
        if(!active) return cell
        if(id % BOARD_WIDTH === BOARD_WIDTH - 1 || !board[id + 1].active)
            idToDelete = [...idToDelete, id];
        board[id - 1] = board[id];
    });
    map(id => {
        board[id] = INITIAL_CELL;
    },idToDelete);
    activePiece.posX -= 1;
    return newUser;
};

export const rotate = user => {
    const newUser = {...user};
    let deletedIds = [];
    let { board, activePiece, } = newUser;
    const newVersion = inc(activePiece.version) < length(activePiece.piece) ? inc(activePiece.version) : 0;
    activePiece.version = newVersion;
    activePiece.version = newVersion;
    if(activePiece.posX < 0 || activePiece.posX + Math.sqrt(length(activePiece.piece[activePiece.version])) > BOARD_WIDTH)
        return newUser;
    board.map((cell, id) => {
        if(cell.active)
            board[id] = INITIAL_CELL;
            deletedIds = [...deletedIds, id];
    });
    try {
        newUser.board = Piece.addPiece(board, activePiece);
    } catch(e) {
        activePiece.version = newVersion > 0 ? newVersion - 1 : length(activePiece.piece);
        try {
            newUser.board = Piece.addPiece(board, activePiece)
        } catch(e) {
            return newUser;
        }
        return newUser;
    }
    return newUser;
};