import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map, length, isNil } from 'ramda';
import {
    bool,
    array,
    func,
    string,
    number
} from 'prop-types';
import EventListener from 'react-event-listener';

import {
    AppContainer,
    BoardContainer,
    Texture
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
    getUsersNames,
    getMyScore,
    getNextPieces,
    getGameDecount,
} from '../../selectors/game';
import { move } from '../../actions/move';
import { startGame } from '../../actions/game';
import GameInfo from '../GameInfo';
import Board from '../Board';
import Spectre from '../Spectre';
import StartButton  from '../../components/StartButton';
import Toasts from '../../components/Toasts';
import Title from '../../components/Title';
import ErrorModal from '../../components/ErrorModal';
import Score from '../../components/Score';
import NextPieces from '../../components/NextPieces';
import WaitingLabel from '../../components/WaitingLabel';

const propTypes = {
    myBoard: array,
    enemyBoard: array,
    move: func.isRequired,
    startGame: func,
    isGameStarted: bool.isRequired,
    displayModal: bool.isRequired,
    roomName: string,
    modalMessage: string,
    me: string,
    users: array,
    toasts: array.isRequired,
    errorMessage: string,
    enemyName: string,
    usersNames: array,
    myScore: number,
    nextPieces: array.isRequired,
    gameDecount: bool.isRequired,
};

export const App = ({
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
    usersNames,
    myScore,
    nextPieces,
    gameDecount
}) =>
(
    <Texture>
        <AppContainer>
            <Title topValue={'Red'} bottomValue={'Tetris'}/>
            {!isNil(errorMessage) && <ErrorModal value={errorMessage}/>}
            {isNil(errorMessage) && !isNil(myBoard) && 
                <Fragment>
                    <EventListener target={document} onKeyDown={event => move(event, io, me, roomName)} />
                    <GameInfo me={me} usersNames={usersNames} owner={owner}/>
                    <Toasts toasts={toasts}/>
                    <BoardContainer>
                        <Board
                            board={myBoard}
                            displayModal={displayModal}
                            modalMessage={modalMessage}
                        />
                        {length(users) > 1 && <Spectre
                            board={enemyBoard}
                        />}
                        <NextPieces pieces={nextPieces} multiPlayers={length(users) > 1}/>
                    </BoardContainer>
                    <Score score={myScore} opacity={isGameStarted ? 1 : 0} />
                    {owner ?
                        <StartButton
                            startGame={startGame}
                            isGameStarted={isGameStarted}
                            io={io}
                            roomName={roomName}
                            me={me}
                        /> :
                        <WaitingLabel
                            isGameStarted={isGameStarted}
                            enemyName={enemyName}
                            gameDecount={gameDecount}
                        />
                    }
                </Fragment>
            }
        </AppContainer>
    </Texture>
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
    usersNames: getUsersNames(state),
    toasts: getToasts(state),
    errorMessage: getErrorMessage(state),
    enemyName: getEnemyName(state),
    myScore: getMyScore(state),
    nextPieces: getNextPieces(state),
    gameDecount: getGameDecount(state),
});

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);