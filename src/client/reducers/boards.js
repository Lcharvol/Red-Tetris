    import { map } from 'ramda';

    import {
      MOVE_TOP,
      MOVE_BOTTOM,
      MOVE_LEFT,
      MOVE_RIGHT,
      DELETE_LINE,
      moveTop,
      moveBottom,
      moveLeft,
      moveRight,
    } from '../actions/move';
    import {
      ADD_PIECE,
      addRandomPiece,
    } from '../actions/piece';
    import {
      START_GAME,
  } from '../actions/game';
    import { FAKE_CELL_COLOR } from '../constants/colors';

    const initialState = {
      myBoard: map(() => ({
        value: 0,
        color: FAKE_CELL_COLOR,
        active: false,
      }),new Array(200)),
      enemyBoard: map(() => ({
        value: 0,
        color: FAKE_CELL_COLOR,
        active: false,
      }),new Array(200)),
    };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case MOVE_TOP:
        return {...state, myBoard: moveTop(state.myBoard)};
      case MOVE_BOTTOM:
        return {...state, myBoard: moveBottom(state.myBoard)};
      case MOVE_LEFT:
        return {...state, myBoard: moveLeft(state.myBoard)};
      case MOVE_RIGHT:
        return {...state, myBoard: moveRight(state.myBoard)};
      case START_GAME:
        return {...state, myBoard: addRandomPiece(state.myBoard)};
      case ADD_PIECE:
        return {...state, myBoard: addRandomPiece(state.myBoard)};
      default:
        return state;
    }
  };
  
  export default reducer;