import { TOAST_DURATION } from '../constants/game';
import { pieces } from '../constants/pieces';

export const removeToast = (io, room) => setTimeout(() => io.to(room).emit('action', { name: 'removeToast'}), TOAST_DURATION);

export const emitToRoom = (io, room, type, name, body) => io.to(room).emit(type, { name, body });

export const emitToSocket = (socket, type, name, message) =>  socket.emit(type, { name, message });

export const getRandomNumber = (min , max) => {
    return Math.round(min + Math.random() * (max - min));
};

export const getRandomPiece = () => pieces[getRandomNumber(0, 6)];