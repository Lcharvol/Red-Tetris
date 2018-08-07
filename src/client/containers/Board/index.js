import React from 'react';
import { map, isNil } from 'ramda';
import {
    array,
    bool,
    string,
} from 'prop-types';

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
}

const Board = ({
    board = INITIAL_BOARD,
    displayModal = false,
    modalMessage = '',
}) => (
    <Back>
        <Container>
            <GameModal value={modalMessage} opacity={displayModal ? 0.6 : 0}/>
            <Shadow/>
            <InnerBoard>
                {board.map((cell, id) => (
                    <Cell key={id} color={cell.color} value={cell.value} />
                ))}
            </InnerBoard>
        </Container>
    </Back>
);

Board.propTypes = propTypes;

export default Board;