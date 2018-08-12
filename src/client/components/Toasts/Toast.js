import React from 'react';
import { string, bool } from 'prop-types';
import { compose, lifecycle, withStateHandlers, onlyUpdateForKeys } from 'recompose';

import { ToastContainer } from './styles';

const propTypes = {
    text: string,
    isMounted: bool.isRequired,
    active: bool.isRequired,
};

const Toast = ({ text, isMounted, active }) => (
    <ToastContainer isMounted={isMounted} active={active}>
        {text}
    </ToastContainer>
);

Toast.propTypes = propTypes;

export default compose(
    withStateHandlers(
        ({ initialIsMounted = false }) => ({
            isMounted: initialIsMounted,
        }),
        {
            handleChangeIsMounted: ({ isMounted }) => () => ({
                isMounted: !isMounted,
            }),
        }
    ),
    lifecycle({
        componentDidMount() {
            setTimeout(() => this.props.handleChangeIsMounted(), 300);
        },
        componentWillUnmount() {
            this.props.handleChangeIsMounted();
        },
    }),
    onlyUpdateForKeys(['text', 'isMounted', 'active'])
)(Toast);