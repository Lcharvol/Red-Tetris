import React from'react';
import { string, number, func } from 'prop-types';
import { compose, lifecycle, withStateHandlers } from 'recompose';

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
    handleChangeOpacity: func.isRequired,
};

const intv = (handleChangeOpacity) => setInterval(() => {
    let randomTimer = getRandomNumber(500, 1500);
    handleChangeOpacity();
    setTimeout(() => handleChangeOpacity(), randomTimer);
}, 2000);

const Title = ({
    topValue,
    bottomValue,
    opacity,
    handleChangeOpacity,
}) => (
    <Container onClick={() => handleChangeOpacity()}>
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
        componentWillUnmount() {clearInterval(intv);}
    }),
)(Title);