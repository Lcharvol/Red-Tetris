import React from 'react';
import { bool, func } from 'prop-types';

import { 
    Container,
} from './styles';

const propTypes = {
    startGame: func.isRequired,
    isGameStarted: bool.isRequired,
}

const StartButton = ({
    startGame,
    isGameStarted,
}) => (
    <Container
        onClick={() =>{
            if(!isGameStarted) startGame()
        }}
        isGameStarted={isGameStarted}
    >
        Start
    </Container>
);

StartButton.propTypes = propTypes;

export default StartButton;