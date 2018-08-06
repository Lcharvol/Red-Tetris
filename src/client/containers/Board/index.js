import React from 'react';
import { map, isNil } from 'ramda';
import {
    array,
    bool,
    string,
    number,
} from 'prop-types';
import { compose, lifecycle, withStateHandlers } from 'recompose';

import {
    Container,
    InnerBoard,
    Back,
    Shadow,
} from './styles';
import Cell from '../../components/Cell';
import GameModal from '../../components/GameModal';
import { INITIAL_BOARD } from '../../constants/board';

const propTypes = {
    board: array,
    displayModal: bool,
    modalMessage: string,
    opacity: number,
}

const Board = ({
    board = INITIAL_BOARD,
    displayModal = false,
    modalMessage = '',
    opacity = 1,
}) => (
    <Back>
        <Container opacity={opacity}>
            <GameModal value={modalMessage} opacity={displayModal ? 0.6 : 0}/>
            <Shadow/>
            <InnerBoard>
                {board.map((cell, id) => (
                    <Cell key={id} cell={cell} />
                ))}
            </InnerBoard>
        </Container>
    </Back>
);

Board.propTypes = propTypes;

export default Board;