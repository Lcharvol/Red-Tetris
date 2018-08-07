import React from 'react';
import { onlyUpdateForPropTypes, compose, setPropTypes } from 'recompose';
import { object, string, number } from 'prop-types' ;

import { Container } from './styles';

const Cell = ({ color, value }) => (
    <Container
        color={color}
        value={value}
    />
);

export default compose(
    onlyUpdateForPropTypes,
    setPropTypes({
        color: string.isRequired,
        value: number.isRequired,
    })
  )(Cell);