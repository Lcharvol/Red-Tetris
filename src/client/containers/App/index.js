import React from 'react';

import {
    AppContainer,
    BoardContainer
} from './styles';
import Board from '../Board';

const App = () => (
    <AppContainer>
        <BoardContainer>
            <Board/>
            <Board/>
        </BoardContainer>
    </AppContainer>
);

export default App;