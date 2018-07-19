import React from 'react';

import { Container } from './styles';

const Cell = ({ cell: { color } }) => (
    <Container color={color}/>
);

export default Cell;