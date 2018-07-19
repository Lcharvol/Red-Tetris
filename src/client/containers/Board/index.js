import React from 'react';
import { map } from 'ramda';
import {
    Container,
    InnerBoard,
} from './styles';

import Cell from '../../components/Cell';

const Board = ({ board }) => (
    <Container>
        <InnerBoard>
            {board.map((cell, id) => (
                <Cell key={id} cell={cell} />
            ))}
        </InnerBoard>
    </Container>
);

export default Board;