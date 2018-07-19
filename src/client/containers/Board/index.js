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
            {board.map((value, id) => (
                <Cell key={id} value={value} />
            ))}
        </InnerBoard>
    </Container>
);

export default Board;