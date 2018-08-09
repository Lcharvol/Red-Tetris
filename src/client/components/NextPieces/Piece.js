import React from 'react';
import { length } from 'ramda';
import { onlyUpdateForKeys } from 'recompose';

import {
    PieceContainer,
    PieceContent,
    Cell
} from './styles';

const Piece = ({ piece, size, opacity, pieceId }) => (
    <PieceContainer>
        <PieceContent
            pieceWidth={Math.sqrt(length(piece.piece[piece.version]))}
            size={size}
            opacity={opacity}
        >
            {piece.piece[piece.version].map((value, id) =>
                <Cell key={id} value={value} color={piece.color}/>
            )}
        </PieceContent>
    </PieceContainer>
);

export default onlyUpdateForKeys(['pieceId'])(Piece);