export const MOVE_TOP = 'MOVE_TOP';
export const MOVE_BOTTOM = 'MOVE_BOTTOM';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const ADD_PIECE = 'ADD_PIECE';

export const moveTop = board => {
    const newBoard = board;
    return newBoard;
}

export const moveBottom = board => {
    const newBoard = board;
    return newBoard;
}

export const moveRight = board => {
    const newBoard = board;
    return newBoard;
}

export const moveLeft = board => {
    const newBoard = board;
    return newBoard;
}

export const move = event => (dispatch) => {
    const { key } = event
    if (key === 'ArrowUp') {
        dispatch(({ type: ADD_PIECE }));
    };
    if (key === 'ArrowDown') {
        dispatch(({ type: MOVE_BOTTOM }));
    };
    if (key === 'ArrowLeft') {
        dispatch(({ type: MOVE_LEFT }));
    };
    if (key === 'ArrowRight') {
        dispatch(({ type: MOVE_RIGHT }));
    };
}