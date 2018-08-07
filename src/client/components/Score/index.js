import React from 'react';
import { number } from 'prop-types';

import { Container } from './styles';

const propTypes = {
    score: number.isRequired,
    opacity: number.isRequired,
};

const Score = ({ score, opacity }) => (
    <Container opacity={opacity}>
        {score}
    </Container>
);

Score.propTypes = propTypes;

export default Score;