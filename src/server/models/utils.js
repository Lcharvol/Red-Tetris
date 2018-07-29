import { TOAST_DURATION } from '../constants/game';

export const removeToast = (io, room) => setTimeout(() => io.to(room).emit('action', { name: 'removeToast'}), TOAST_DURATION);

export const emitToRoom = (io, room, type, name, body) => io.to(room).emit(type, { name, body });

export const emitToSocket = (socket, type, name, message) =>  socket.emit(type, { name, message });