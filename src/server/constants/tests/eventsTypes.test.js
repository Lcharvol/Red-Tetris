import {
    DISCONNECT,
    JOIN_ROOM,
    ACTION,
    CONNECTION
} from '../eventsTypes';

describe('Constants eventsTypes', () => {
  test('success', () => {
    expect(DISCONNECT).toBe('disconnect');
    expect(JOIN_ROOM).toBe('joinRoom');
    expect(ACTION).toBe('action');
    expect(CONNECTION).toBe('connection');
  });
});