import { length } from 'ramda';

import {
    getRandomNumber,
} from './utils';
import debug from 'debug';
import { pieces } from '../constants/pieces';
import { CELLS_COLORS, FAKE_CELL_COLOR } from '../constants/colors';
import { BOARD_WIDTH } from '../../client/constants/board';

const pieceLogger = debug('tetris:piece');

const Piece = {
    getRandomPiece() {
        const pieceId = getRandomNumber(0, 6);
        const newColor = Piece.getCellColor();
        return {
            piece: pieces[pieceId],
            pieceId,
            version: 0,
            posX: 3,
            posY: 0,
            color: newColor,
        };
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
    addPiece(board, newPiece) {
        const { piece, pieceId, color, version, posX, posY } = newPiece;
        const newBoard = [...board];
        const newValue = getRandomNumber(1, 1000);

        piece[version].map((value, id) => {
            if(value === 0) return
            const pieceWidth = Math.sqrt(length(piece[version]));
            let newId = (id % pieceWidth) + (BOARD_WIDTH * Math.floor(id / pieceWidth)) + posX + (posY * BOARD_WIDTH);
            if(newBoard[newId].value !== 0)
                throw new Error('cant add');
            newBoard[newId] = {
                value: newValue,
                color: value === 0 ? FAKE_CELL_COLOR : color,
                active: newValue === 0 ? false : true,
            };
        })
        return newBoard;
    },
};

export default Piece;