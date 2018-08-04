import React from 'react';
import { array } from 'prop-types';

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
            {board.map((cell, id) => cell.value === 0 ?
                <EmptyCell key={id}/> :
                <FullCell key={id}/>
            )}
        </Content>
    </Container>
);

Spectre.propTypes = propTypes;

export default Spectre;