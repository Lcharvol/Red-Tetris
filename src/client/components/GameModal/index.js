import React from 'react';
import { string, number } from 'prop-types';
import { compose, lifecycle, withStateHandlers } from 'recompose';

import {
    Container,
} from './styles';

const propTypes = {
    value: string,
    opacity: number.isRequired,
}

const GameModal = ({ value = '', opacity }) => (
    <Container opacity={opacity} >
        {value}
    </Container>
);

GameModal.propTypes = propTypes;

export default GameModal;