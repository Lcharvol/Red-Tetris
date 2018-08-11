import Piece from '../Piece';
import { INITIAL_BOARD } from '../../../client/constants/board';

describe('models', () => {
    describe('Piece', () => {

        describe('getRandomPiece', () => {
            it('Should return a random piece', () => {
                const res = Piece.getRandomPiece();
                expect(res).toBeDefined();
                expect(res.version).toEqual(0);
            });
        });

        describe('addPiece', () => {
            it('Should return a new board with new piece', () => {
                const board = INITIAL_BOARD;
                const piece = Piece.newPiece();
                const res = Piece.addPiece(board, piece);
                expect(res).toBeDefined();
            });

            it('Should throw an error', () => {
                let board = [...INITIAL_BOARD];
                board[0].value = 1;
                board[1].value = 1;
                board[2].value = 1;
                board[3].value = 1;
                board[4].value = 1;
                board[5].value = 1;
                board[6].value = 1;
                board[15].value = 1;
                board[14].value = 1;
                board[13].value = 1;
                const piece = Piece.newPiece();
                expect(() => {Piece.addPiece(board, piece)}).toThrow('cant add');
            });
        });

        describe('setAllCellsInactive', () => {
            it('Should return a new board with all pieces anactives', () => {
                let board = [...INITIAL_BOARD];
                board[0].active = true;
                const res = Piece.setAllCellsInactive(board);
                expect(res).toBeDefined();
                expect(res).toEqual(INITIAL_BOARD);
            });
        });
    });
});