import { getRandomPiece } from './utils';
import debug from 'debug';

const pieceLogger = debug('tetris:piece');

const Piece = {
    newPiece() {
        return getRandomPiece();
    }
};

export default Piece;