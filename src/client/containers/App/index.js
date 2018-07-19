import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { array, func } from 'prop-types';
import EventListener from 'react-event-listener';

import {
    AppContainer,
    BoardContainer
} from './styles';
import { getMyBoard  } from '../../selectors/board';
import { move } from '../../actions/move';
import Board from '../Board';

const propTypes = {
    myBoard: array.isRequired,
    move: func.isRequired,
}

const App = ({
    myBoard,
    move,
}) => (
    <AppContainer>
        <BoardContainer>
            <EventListener target={document} onKeyDown={move} />
            <Board board={myBoard} />
        </BoardContainer>
    </AppContainer>
);

const actions = { move };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
    myBoard: getMyBoard(state),
});

App.propTypes = propTypes;

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(App);