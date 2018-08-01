import { length } from 'ramda';

import {
    getRandomNumber,
} from './utils';
import debug from 'debug';
import { pieces } from '../constants/pieces';
import { CELLS_COLORS, FAKE_CELL_COLOR } from '../constants/colors';

const pieceLogger = debug('tetris:piece');

const Piece = {
    getRandomPiece() {
        return pieces[getRandomNumber(0, 6)];
    },
    newPiece() {
        return Piece.getRandomPiece();
    },
    getCellColor() {
        return CELLS_COLORS[getRandomNumber(0, length(CELLS_COLORS) - 1)]
    },
    setAllCellsInactive(board) {
        board.map((cell, id) => {
            if(cell.active)
                board[id].active = false;
        })
        return board;
    },
    addRandomPiece(board) {
        const newPiece = Piece.getRandomPiece();
        const newBoard = [...board];
        const newValue = getRandomNumber(1, 1000);
        const newColor = Piece.getCellColor();
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
    },
    addPiece(board, piece) {
        const newBoard = [...board];
        const newValue = getRandomNumber(1, 1000);
        const newColor = Piece.getCellColor();
        piece.map((value, id) => {
            if(value === 0) return
            let newId = (id % 4) + (10 * Math.floor(id / 4)) + Math.floor(10 / 3);
            if(newBoard[newId].value !== 0)
                throw new Error('cant add');
            newBoard[newId] = {
                value: newValue,
                color: value === 0 ? FAKE_CELL_COLOR : newColor,
                active: newValue === 0 ? false : true,
            };
        })
        return newBoard;
    },
};

export default Piece;