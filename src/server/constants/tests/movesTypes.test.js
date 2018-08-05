import {
    RIGHT,
    LEFT,
    BOTTOM,
    ROTATE
} from '../movesTypes';

describe('Constants movesTypes', () => {
  test('success', () => {
    expect(RIGHT).toBe('right');
    expect(LEFT).toBe('left');
    expect(BOTTOM).toBe('bottom');
    expect(ROTATE).toBe('rotate');
  });
});