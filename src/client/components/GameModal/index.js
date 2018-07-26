import React from 'react';
import { compose, lifecycle, withStateHandlers } from 'recompose';

import {
    Container,
} from './styles';

const GameModal = ({ value = ''}) => (
    <Container>
        {value}
    </Container>
);

export default GameModal;