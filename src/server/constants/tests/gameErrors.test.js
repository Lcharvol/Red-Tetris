import {
    GAME_STARTED,
    ALLREADY_IN_ROOM,
    FULL_ROOM
} from '../gameErrors';

describe('Constants movesTypes', () => {
  test('success', () => {
    expect(GAME_STARTED).toBe('gameStarted');
    expect(ALLREADY_IN_ROOM).toBe('allreadyInRoom');
    expect(FULL_ROOM).toBe('fullRoom');
  });
});