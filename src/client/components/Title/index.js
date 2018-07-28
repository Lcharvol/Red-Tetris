import React from'react';
import { string } from 'prop-types';

import {
    Container,
    TopText,
    BottomText
} from './styles';

const propTypes = {
    topValue: string.isRequired,
    bottomValue: string.isRequired,
}

const Title = ({ topValue, bottomValue }) => (
    <Container>
        <TopText>{topValue}</TopText>
        <BottomText>{bottomValue}</BottomText>
    </Container>
);

Title.propTypes = propTypes;

export default Title;