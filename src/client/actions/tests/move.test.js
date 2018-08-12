import { move } from '../move';

describe('Move action', () => {
  describe('Should emit proper event', () => {
    it('Up', () => {
        const event = { key: 'ArrowUp'}
        const io = {
            emit: jest.fn(),
        };
        const me = 'lcharvol';
        const roomName = 'roomName';
        const res = move(event, io, me, roomName);

        expect(io.emit).not.toHaveBeenCalled();
    });
    it('Down', () => {
        const event = { key: 'ArrowDown'}
        const io = {
            emit: jest.fn(),
        };
        const me = 'lcharvol';
        const roomName = 'roomName';
        const res = move(event, io, me, roomName);

        expect(io.emit).not.toHaveBeenCalled();
    });
    it('Right', () => {
        const event = { key: 'ArrowRight'}
        const io = {
            emit: jest.fn(),
        };
        const me = 'lcharvol';
        const roomName = 'roomName';
        const res = move(event, io, me, roomName);

        expect(io.emit).not.toHaveBeenCalled();
    });
    it('Left', () => {
        const event = { key: 'ArrowLeft'}
        const io = {
            emit: jest.fn(),
        };
        const me = 'lcharvol';
        const roomName = 'roomName';
        const res = move(event, io, me, roomName);

        expect(io.emit).not.toHaveBeenCalled();
    });
  });
});