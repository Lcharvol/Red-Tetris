import React from 'react';
import { array, bool } from 'prop-types';
import { times, length, equals } from 'ramda';

import {
    Container,
    PieceContainer,
    PieceContent,
    Cell
} from './styles';
import Piece from './Piece';

const propTypes = {
    pieces: array.isRequired,
    multiPlayers: bool.isRequired,
};

const NextPieces = ({ pieces, multiPlayers }) => (
    <Container multiPlayers={multiPlayers}>
        {times(nb => 
            <Piece
                key={nb}
                piece={pieces[nb]}
                opacity={equals(nb, 0) ? 1 : 0.5}
                size={equals(nb, 0) ? 1 : 0.6}
                pieceId={pieces[nb].pieceId}
            />
        ,length(pieces) < 2 ? length(pieces): 2)}
    </Container>
);

export default NextPieces;