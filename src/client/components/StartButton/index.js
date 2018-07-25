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
    startGame: func.isRequired,
    isGameStarted: bool.isRequired,
    roomName: string.isRequired,
}

const StartButton = ({
    startGame,
    isGameStarted,
    io,
    roomName,
}) => (
    <Container
        onClick={() =>{
            if(!isGameStarted) io.emit('action', {name: 'startGame', gameName: roomName});
        }}
        isGameStarted={isGameStarted}
    >
    {console.log('roomName: ', roomName)}
        Start
    </Container>
);

StartButton.propTypes = propTypes;

export default StartButton;