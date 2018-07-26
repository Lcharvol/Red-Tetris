import React from 'react';
import { isNil } from 'ramda';

import { Container } from './styles';

const Toast = ({ text }) => (
    <Container>
        {text}
    </Container>
);

export default Toast;