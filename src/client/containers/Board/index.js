import React from 'react';
import { map } from 'ramda';
import {
    Container,
    InnerBoard,
} from './styles';

import Cell from '../../components/Cell';
import GameModal from '../../components/GameModal';

const Board = ({ board, displayModal }) => (
    <Container>
        {displayModal && <GameModal/>}
        <InnerBoard>
            {board.map((cell, id) => (
                <Cell key={id} cell={cell} />
            ))}
        </InnerBoard>
    </Container>
);

export default Board;