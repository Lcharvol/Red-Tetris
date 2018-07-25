import React from 'react';
import { map } from 'ramda';
import {
    array,
    bool,
    string,
    number,
} from 'prop-types';

import {
    Container,
    InnerBoard,
} from './styles';
import Cell from '../../components/Cell';
import GameModal from '../../components/GameModal';

const propTypes = {
    board: array.isRequired,
    displayModal: bool,
    modalMessage: string,
    opacity: number,
}

const Board = ({
    board = [],
    displayModal = false,
    modalMessage = '',
    opacity = 1,
}) => (
    <Container opacity={opacity}>
        {displayModal && <GameModal value={modalMessage}/>}
        <InnerBoard>
            {board.map((cell, id) => (
                <Cell key={id} cell={cell} />
            ))}
        </InnerBoard>
    </Container>
);

Board.propTypes = propTypes;

export default Board;