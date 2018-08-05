import {
    initialBoard,
} from '../board';

describe('Constants board', () => {
  test('success', () => {
    expect(initialBoard.length).toBe(200);
  });
});