export const TOAST_DURATION = 3000;

export const DROP_INTERVAL = 500;

export const roomPattern = {
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
};