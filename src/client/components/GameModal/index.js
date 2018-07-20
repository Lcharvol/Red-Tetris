import React from 'react';

import {
    Container,
} from './styles';

const GameModal = ({ value = ''}) => (
    <Container>
        {value}
    </Container>
);

export default GameModal;