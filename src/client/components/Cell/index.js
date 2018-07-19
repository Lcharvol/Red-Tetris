import React from 'react';

import { Container } from './styles';
import { getCellColor } from '../../utils';

const Cell = ({ value }) => (
    <Container color={getCellColor(value)}/>
);

export default Cell;