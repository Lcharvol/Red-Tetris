import React from 'react';
import {
    number,
    string,
    bool
} from 'prop-types';
import {
    compose,
    withStateHandlers,
    lifecycle,
    onlyUpdateForKeys
} from 'recompose';

import { 
    Container,
} from './styles';

const propTypes = {
    opacity: number.isRequired,
    enemyName: string.isRequired,
    isGameStarted: bool.isRequired,
}

const WaitingLabel = ({
    enemyName,
    opacity,
    isGameStarted
}) => (
    <Container opacity={!isGameStarted ? opacity : 0}>
        {`Waiting for ${enemyName} to start...`}
    </Container>
);

WaitingLabel.propTypes = propTypes;

export default compose(
    withStateHandlers(
        ({ initialOpacity = 1 }) => ({
            opacity: initialOpacity,
        }),
        {
            handleChangeOpacity: () => (value) => ({
                opacity: value,
            }),
        }
    ),
    lifecycle({
        componentDidUpdate(prevProps, prevState, snapshot) {
            if(prevProps.isGameStarted && !this.props.isGameStarted)
                setTimeout(() => this.props.handleChangeOpacity(1), 1400);
            if(!prevProps.gameDecount && this.props.gameDecount)
                this.props.handleChangeOpacity(0);
        },
    }),
    onlyUpdateForKeys(['isGameStarted', 'opacity', 'enemyName'])
)(WaitingLabel);