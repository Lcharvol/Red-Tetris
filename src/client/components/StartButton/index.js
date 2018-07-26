import React from 'react';
import {
    bool,
    func,
    roomName,
    string,
} from 'prop-types';

import { 
    Container,
} from './styles';

const propTypes = {
    startGame: func,
    isGameStarted: bool.isRequired,
    roomName: string.isRequired,
    me: string.isRequired,
}

const StartButton = ({
    startGame,
    isGameStarted,
    io,
    roomName,
    me,
}) => (
    <Container
        onClick={() => {
            if(!isGameStarted) io.emit('action', {name: 'startGame', gameName: roomName, user: me});
        }}
        isGameStarted={isGameStarted}
    >
        Start
    </Container>
);

StartButton.propTypes = propTypes;

export default StartButton;