    import { map } from 'ramda';

    import {
      MOVE_TOP,
      MOVE_BOTTOM,
      MOVE_LEFT,
      MOVE_RIGHT,
      moveTop,
      moveBottom,
      moveLeft,
      moveRight,
    } from '../actions/move';

    import {
      ADD_PIECE,
      addRandomPiece,
    } from '../actions/piece';

    const initialState = {
      myBoard: map(() => 0,new Array(200)),
      enemyBoard: [],
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
      case ADD_PIECE:
        return {...state, myBoard: addRandomPiece(state.myBoard)};
      default:
        return state;
    }
  };
  
  export default reducer;