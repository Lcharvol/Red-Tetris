import React from 'react';
import { number, func } from 'prop-types';
import { compose, lifecycle, withStateHandlers, onlyUpdateForKeys } from 'recompose';

import { Container } from './styles';

const propTypes = {
    score: number.isRequired,
    opacity: number.isRequired,
    size: number.isRequired,
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
            if(prevProps.score < this.props.score) {
                let diff = this.props.score - prevProps.score;
                if(diff > 60)
                    diff = 60
                this.props.handleChangeSize(1 + (diff / 100))
                setTimeout(() => this.props.handleChangeSize(1), 200);
            }
        },
    }),
    onlyUpdateForKeys(['score', 'opacity', 'size']),
)(Score);