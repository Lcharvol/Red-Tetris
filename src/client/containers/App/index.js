import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    bool,
    array,
    func,
} from 'prop-types';
import EventListener from 'react-event-listener';

import {
    AppContainer,
    BoardContainer
} from './styles';
import { getMyBoard  } from '../../selectors/board';
import { getIsGameStarted } from '../../selectors/game';
import { move } from '../../actions/move';
import { startGame } from '../../actions/game';
import Board from '../Board';
import StartButton  from '../../components/StartButton';

const propTypes = {
    myBoard: array.isRequired,
    move: func.isRequired,
    startGame: func.isRequired,
    isGameStarted: bool.isRequired,
}

const App = ({
    myBoard,
    move,
    startGame,
    isGameStarted,
}) => (
    <AppContainer>
        <BoardContainer>
            <EventListener target={document} onKeyDown={move} />
            <Board board={myBoard} />
        </BoardContainer>
        <StartButton startGame={startGame} isGameStarted={isGameStarted}/>
    </AppContainer>
);

const actions = {
    move,
    startGame,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
    myBoard: getMyBoard(state),
    isGameStarted: getIsGameStarted(state),
});

App.propTypes = propTypes;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(App);