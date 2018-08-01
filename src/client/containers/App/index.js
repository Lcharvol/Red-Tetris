import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, length, isEmpty, isNil, equals } from 'ramda';
import {
    bool,
    array,
    func,
    string,
} from 'prop-types';
import EventListener from 'react-event-listener';

import {
    AppContainer,
    BoardContainer,
    ToastsContainer,
    WaitingLabel
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
    getToasts,
    getErrorMessage,
    getEnemyName,
} from '../../selectors/game';
import { move, moveCycle } from '../../actions/move';
import { startGame } from '../../actions/game';
import GameInfo from '../GameInfo';
import Board from '../Board';
import Login from '../Login';
import StartButton  from '../../components/StartButton';
import Toast from '../../components/Toast';
import Title from '../../components/Title';
import ErrorModal from '../../components/ErrorModal';

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
    toasts: array.isRequired,
    errorMessage: string,
    enemyName: string,
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
    toasts,
    errorMessage,
    enemyName,
}) =>
(
    <AppContainer>
        <Title topValue={'Red'} bottomValue={'Tetris'}/>
        {!isNil(errorMessage) && <ErrorModal value={errorMessage}/>}
        {isNil(errorMessage) && length(me) > 0 && 
            <Fragment>
                <GameInfo/>
                <BoardContainer>
                    <ToastsContainer>
                        {map(toast => <Toast key={toast.id} text={toast.message}/>, toasts)}
                    </ToastsContainer>
                    <EventListener target={document} onKeyDown={event => move(event, io, me, roomName)} />
                    {map(user => (
                        <Board
                            key={user.id}
                            board={user.board}
                            displayModal={equals(user.name, me) ? displayModal : false}
                            modalMessage={equals(user.name, me) ? modalMessage : ''}
                            opacity={equals(user.name, me) ? 1 : 0.6}
                            isSmall={equals(user.name, me) ? false : true}
                        />)
                    ,users)}
                </BoardContainer>
                {owner ?
                    <StartButton
                        startGame={startGame}
                        isGameStarted={isGameStarted}
                        io={io}
                        roomName={roomName}
                        me={me}
                    /> :
                    <WaitingLabel isGameStarted={isGameStarted}>{`Waiting for ${enemyName} to start...`}</WaitingLabel>
                }
            </Fragment>
        }
        {!length(me) && <Login />}
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
    toasts: getToasts(state),
    errorMessage: getErrorMessage(state),
    enemyName: getEnemyName(state),
});

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);