import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isEmpty, isNil } from 'ramda';
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
import {
    getIsGameStarted,
    getDisplayModal,
    getOwner,
    getRoomName,
    getModalMessage,
    getMyBoard,
    getEnemyBoard,
    getMe,
    getUsers,
    getDisplayToast,
    getToastMessage,
} from '../../selectors/game';
import { move, moveCycle } from '../../actions/move';
import { startGame } from '../../actions/game';
import Board from '../Board';
import StartButton  from '../../components/StartButton';
import Toast from '../../components/Toast';

const propTypes = {
    myBoard: array,
    enemyBoard: array,
    move: func.isRequired,
    startGame: func,
    isGameStarted: bool.isRequired,
    displayModal: bool.isRequired,
    getRoomName: string,
    modalMessage: string,
    me: string,
    users: array,
    displayToast: bool.isRequired,
    toastMessage: string.isRequired,
};

const App = ({
    myBoard,
    enemyBoard,
    move,
    startGame,
    isGameStarted,
    displayModal,
    owner,
    io,
    roomName,
    modalMessage,
    me,
    users,
    displayToast,
    toastMessage,
}) =>
(
    <AppContainer>
        <BoardContainer>
            {displayToast && <Toast text={toastMessage}/>}
            <EventListener target={document} onKeyDown={event => move(event, io, me, roomName)} />
            <Board
                board={myBoard}
                displayModal={displayModal}
                modalMessage={modalMessage}
            />
            <Board
                board={enemyBoard}
                opacity={0.4}
                isSmall={true}
            />
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
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
    myBoard: getMyBoard(state),
    enemyBoard: getEnemyBoard(state),
    isGameStarted: getIsGameStarted(state),
    displayModal: getDisplayModal(state),
    owner: getOwner(state),
    roomName: getRoomName(state),
    modalMessage: getModalMessage(state),
    me: getMe(state),
    users: getUsers(state),
    displayToast: getDisplayToast(state),
    toastMessage: getToastMessage(state),
});

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);