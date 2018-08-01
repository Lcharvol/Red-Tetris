import React from 'react';
import {
    bool,
    func,
    roomName,
    string,
    number,
} from 'prop-types';
import { compose, lifecycle, withStateHandlers } from 'recompose';

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
        isGameStarted={isGameStarted}
        opacity={opacity}
    >
        <ButtonText>PLAY</ButtonText>
    </Container>
);

StartButton.propTypes = propTypes;

export default compose(
    withStateHandlers(
        ({ initialOpacity = 0 }) => ({
            opacity: initialOpacity,
        }),
        {
            handleChangeOpacity: () => (value) => ({
                opacity: value,
            }),
        }
    ),
)(StartButton);