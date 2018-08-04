import React from 'react';
import { array } from 'prop-types';
import { map } from 'ramda';

import {
    Container,
    Content,
    EmptyCell,
    FullCell,
} from './styles';

const propTypes = {
    board: array,
};

const Spectre = ({ board }) => (
    <Container>
        <Content>
            {map(cell => cell.value === 0 ?
                <EmptyCell /> :
                <FullCell />
            ,board)}
        </Content>
    </Container>
);

Spectre.propTypes = propTypes;

export default Spectre;