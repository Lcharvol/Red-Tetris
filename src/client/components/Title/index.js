import React from'react';
import { string, number } from 'prop-types';
import {
    compose,
    lifecycle,
    withStateHandlers,
    onlyUpdateForKeys
} from 'recompose';

import {
    Container,
    TopText,
    BottomText
} from './styles';
import { getRandomNumber } from '../../utils';

const propTypes = {
    topValue: string.isRequired,
    bottomValue: string.isRequired,
    opacity: number.isRequired,
};

export const intv = (handleChangeOpacity) => setInterval(() => {
    let randomTimer = getRandomNumber(500, 1500);
    handleChangeOpacity();
    setTimeout(() => handleChangeOpacity(), randomTimer);
}, 2000);

const Title = ({
    topValue,
    bottomValue,
    opacity,
}) => (
    <Container>
        <TopText>{topValue}</TopText>
        <BottomText glowOpacity={opacity}>{bottomValue}</BottomText>
    </Container>
);

Title.propTypes = propTypes;

export default compose(
    withStateHandlers(
        ({ initialOpacity = 0 }) => ({
            opacity: initialOpacity,
        }),
        {
            handleChangeOpacity: ({ opacity }) => () => ({
                opacity: getRandomNumber(0, 100) / 100,
            }),
        }
    ),
    lifecycle({
        componentDidMount() {
            intv(this.props.handleChangeOpacity);
        },
        componentWillUnmount() {
            clearInterval(intv);
        }
    }),
    onlyUpdateForKeys(['opacity'])
)(Title);