import React from 'react';
import { number, func } from 'prop-types';
import { compose, lifecycle, withStateHandlers, onlyUpdateForKeys } from 'recompose';

import { Container } from './styles';

const propTypes = {
    score: number.isRequired,
    opacity: number.isRequired,
    size: number.isRequired,
};

export const animateScore = (prevScore, score, handleChangeSize) => {
    if(prevScore < score) {
        let diff = score - prevScore;
        if(diff > 60)
            diff = 60
        handleChangeSize(1 + (diff / 100))
        setTimeout(() => handleChangeSize(1), 200);
    }
};

const Score = ({
    score,
    opacity,
    size,
}) => (
    <Container opacity={opacity} size={size}>
        {score}
    </Container>
);

Score.propTypes = propTypes;


export default compose(
    withStateHandlers(
        ({ initialSize = 1 }) => ({
            size: initialSize,
        }),
        {
            handleChangeSize: () => (newSize) => ({
                size: newSize,
            }),
        }
    ),
    lifecycle({
        componentDidUpdate(prevProps, prevState, snapshot) {
            animateScore(prevProps.score, this.props.score, this.props.handleChangeSize);
        },
    }),
    onlyUpdateForKeys(['score', 'opacity', 'size']),
)(Score);