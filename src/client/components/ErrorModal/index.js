import React from 'react';
import { string } from 'prop-types';

import { Container } from './styles';

const propTypes = {
    value: string,
}

const ErrorModal = ({ value }) => (
    <Container>
        {value}
    </Container>
);

ErrorModal.propTypes = propTypes;

export default ErrorModal;