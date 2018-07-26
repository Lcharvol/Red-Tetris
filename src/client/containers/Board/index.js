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
import { INITIAL_BOARD } from '../../constants/board';

const propTypes = {
    board: array,
    displayModal: bool,
    modalMessage: string,
    opacity: number,
    isSmall: bool,
}

const Board = ({
    board = INITIAL_BOARD,
    displayModal = false,
    modalMessage = '',
    opacity = 1,
    isSmall = false,
}) => (
    <Container opacity={opacity} isSmall={isSmall}>
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