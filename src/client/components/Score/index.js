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
    {console.log('render')}
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
        componentWillReceiveProps(newProps) {
            // console.log('newProps: ', newProps);
        },
    }),
    onlyUpdateForKeys(['score', 'opacity', 'size']),
)(Score);