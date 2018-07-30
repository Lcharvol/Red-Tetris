export const move = (event, io, me, roomName) => (dispatch) => {
    const { key } = event
    
    if (key === 'ArrowDown')
        io.emit('action', { name: 'move', type: 'bottom', gameName: roomName, user: me });
    if (key === 'ArrowLeft')
        io.emit('action', { name: 'move', type: 'left', gameName: roomName, user: me });
    if (key === 'ArrowRight')
        io.emit('action', { name: 'move', type: 'right', gameName: roomName, user: me });
}

export const moveCycle = () => dispatch => dispatch(({ type: MOVE_BOTTOM }));