import React from 'react';

import { Container } from './styles';

const Cell = ({ cell: { color, value } }) => (
    <Container
        color={color}
        value={value}
    />
);

export default Cell;