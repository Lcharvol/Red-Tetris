import {
    START_GAME,
    MOVE,
    UPDATE_GAME_INFO
} from '../actionsTypes';

describe('Constants actionsTypes', () => {
  test('success', () => {
    expect(START_GAME).toBe('startGame');
    expect(MOVE).toBe('move');
    expect(UPDATE_GAME_INFO).toBe('updateGameInfo');
  });
});