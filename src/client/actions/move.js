import { equals } from 'ramda';

export const move = (event, io, me, roomName) => (dispatch) => {
    const { key } = event

    if(equals(key, 'ArrowUp'))
        io.emit('action', { name: 'move', type: 'rotate', gameName: roomName, user: me });
    if (equals(key,'ArrowDown'))
        io.emit('action', { name: 'move', type: 'bottom', gameName: roomName, user: me });
    if (equals(key,'ArrowLeft'))
        io.emit('action', { name: 'move', type: 'left', gameName: roomName, user: me });
    if (equals(key,'ArrowRight'))
        io.emit('action', { name: 'move', type: 'right', gameName: roomName, user: me });
}