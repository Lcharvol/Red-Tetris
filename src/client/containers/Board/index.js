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
    size: number.isRequired,
}

const Board = ({
    board = INITIAL_BOARD,
    displayModal = false,
    modalMessage = '',
    opacity = 1,
    isSmall = false,
    size,
}) => (
    <Container opacity={opacity} isSmall={isSmall} size={size}>
        {displayModal && <GameModal value={modalMessage}/>}
        <InnerBoard>
            {board.map((cell, id) => (
                <Cell key={id} cell={cell} />
            ))}
        </InnerBoard>
    </Container>
);

Board.propTypes = propTypes;

export default compose(
    withStateHandlers(
        ({ initialSize = 0 }) => ({
            size: initialSize,
        }),
        {
            handleChangeSize: () => (value) => ({
                size: value,
            }),
        }
    ),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            if (isNil(this.props.board) && nextProps.board !== this.props.board) {
                this.props.handleChangeSize(1)
            }
          }
    })
)(Board);