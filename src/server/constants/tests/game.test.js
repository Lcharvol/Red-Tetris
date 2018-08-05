import {
    TOAST_DURATION,
    DROP_INTERVAL,
    roomPattern
} from '../game';

describe('Constants game', () => {
  test('success', () => {
    expect(TOAST_DURATION).toBe(3000);
    expect(DROP_INTERVAL).toBe(500);
    expect(roomPattern).toEqual({
        isGameStarted: false,
        displayModal: false,
        toasts: [],
        modal: {
            display: false,
            message: '',
        },
        roomName: '',
        users: [],
        errorMessage: undefined,
    });
  });
});