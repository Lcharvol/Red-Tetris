import React from 'react';
import {
    bool,
    func,
    roomName,
    string,
    number,
} from 'prop-types';
import { compose, withStateHandlers, onlyUpdateForKeys, lifecycle } from 'recompose';

import { 
    Container,
    ButtonText,
} from './styles';

const propTypes = {
    startGame: func,
    isGameStarted: bool.isRequired,
    roomName: string.isRequired,
    me: string.isRequired,
    handleChangeOpacity: func.isRequired,
    opacity: number.isRequired,
}

const StartButton = ({
    startGame,
    isGameStarted,
    io,
    roomName,
    me,
    handleChangeOpacity,
    opacity,
}) => (
    <Container
        onClick={() => {
            if(!isGameStarted) {
                io.emit('action', {name: 'startGame', gameName: roomName, user: me})
                handleChangeOpacity(0);
            };
        }}
        opacity={!isGameStarted ? opacity : 0}
    >
        <ButtonText>PLAY</ButtonText>
    </Container>
);

StartButton.propTypes = propTypes;

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
        },
    }),
    onlyUpdateForKeys(['isGameStarted', 'opacity'])
)(StartButton);