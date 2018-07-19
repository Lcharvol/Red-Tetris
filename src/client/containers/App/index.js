import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { array } from 'prop-types';

import {
    AppContainer,
    BoardContainer
} from './styles';
import { getMyBoard  } from '../../selectors/board';
import Board from '../Board';

const propTypes = {
    myBoard: array.isRequired,
}

const App = ({
    myBoard,
}) => (
    <AppContainer>
        <BoardContainer>
            <Board board={myBoard} />
        </BoardContainer>
    </AppContainer>
);

const mapStateToProps = state => ({
    myBoard: getMyBoard(state),
});

App.propTypes = propTypes;

export default compose(
    connect(mapStateToProps),
  )(App);