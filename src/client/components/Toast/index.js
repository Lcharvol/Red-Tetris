import React from 'react';
import { isNil } from 'ramda';
import { compose, lifecycle, withStateHandlers} from 'recompose'

import { Container } from './styles';

const Toast = ({ text, opacity }) => (
    <Container opacity={opacity}>
        {text}
    </Container>
);

export default compose(
    withStateHandlers(
        ({ initialOpacity = 0 }) => ({
            opacity: initialOpacity,
        }),
        {
            handleChangeOpacity: () => value => ({
                opacity: value,
            }),
        }
    ),
    lifecycle({
        componentWillMount(nextProps) {
                this.props.handleChangeOpacity(1)

          },
          componentWillUnmount() {
            this.props.handleChangeOpacity(0);
          }
    })
)(Toast);