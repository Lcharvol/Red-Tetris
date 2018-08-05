import {
    BUNDLE_ERROR,
} from '../messages';

describe('Constants messages', () => {
  test('success', () => {
    expect(BUNDLE_ERROR).toBe('Error loading index.html');
  });
});