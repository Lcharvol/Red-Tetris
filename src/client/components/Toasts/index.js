import React from 'react';
import { array } from 'prop-types';
import { map } from 'ramda';

import { ToastsContainer } from './styles';

import Toast from './Toast';

const propTypes = {
    toasts: array.isRequired,
};

const Toasts = ({ toasts }) => (
    <ToastsContainer>
        {map(toast => 
            <Toast
                key={toast.id}
                text={toast.message}
                active={toast.active}
            />
        ,toasts)}
    </ToastsContainer>
);

Toasts.propTypes = propTypes;

export default Toasts;