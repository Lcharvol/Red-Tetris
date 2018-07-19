import React from 'react';
import { map } from 'ramda';
import {
    Container,
} from './styles';

import Cell from '../../components/Cell';

const Board = ({ board }) => (
    <Container>
        {board.map((value, id) => (
            <Cell key={id} value={value} />
        ))}
    </Container>
);

export default Board;