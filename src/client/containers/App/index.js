import React from 'react';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    bool,
    array,
    func,
    string,
} from 'prop-types';
import EventListener from 'react-event-listener';

import {
    AppContainer,
    BoardContainer
} from './styles';
import { getMyBoard, getEnemyBoard  } from '../../selectors/board';
import {
    getIsGameStarted,
    getDisplayModal,
    getOwner,
    getRoomName,
} from '../../selectors/game';
import { move, moveCycle } from '../../actions/move';
import { startGame } from '../../actions/game';
import Board from '../Board';
import StartButton  from '../../components/StartButton';

const propTypes = {
    myBoard: array.isRequired,
    enemyBoard: array.isRequired,
    move: func.isRequired,
    moveCycle: func.isRequired,
    startGame: func.isRequired,
    isGameStarted: bool.isRequired,
    displayModal: bool.isRequired,
    getRoomName: string,
};

const App = ({
    myBoard,
    enemyBoard,
    move,
    startGame,
    isGameStarted,
    moveCycle,
    displayModal,
    owner,
    io,
    roomName,
}) =>
(
    <AppContainer>
        <BoardContainer>
            <EventListener target={document} onKeyDown={move} />
            <Board
                board={myBoard}
                displayModal={displayModal}
            />
            {/* <Board
                board={enemyBoard}
                displayModal={displayModal}
            /> */}
        </BoardContainer>
        {owner &&
            <StartButton
                startGame={startGame}
                isGameStarted={isGameStarted}
                io={io}
                roomName={roomName}
            />}
    </AppContainer>
);

const actions = {
    move,
    startGame,
    moveCycle,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
    myBoard: getMyBoard(state),
    enemyBoard: getEnemyBoard(state),
    isGameStarted: getIsGameStarted(state),
    displayModal: getDisplayModal(state),
    owner: getOwner(state),
    roomName: getRoomName(state),
});

App.propTypes = propTypes;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentWillReceiveProps(nextProps) {
            const gameInterval = setInterval(() => {this.props.moveCycle()},500);
            if(nextProps.isGameStarted && this.props.isGameStarted === false)
                gameInterval;
            else
                clearInterval(gameInterval);
        }
      }),
  )(App);