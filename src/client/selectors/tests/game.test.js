import {
    getIsGameStarted,
    getDisplayModal,
    getModalMessage,
    getMe,
    getEnemyName,
    getOwner,
    getRoomName,
    getMyBoard,
    getEnemyBoard,
    getToasts,
    getErrorMessage,
    getUsers,
    getUsersNames,
    getOwnerName,
    getNextPieces,
    getMyScore,
    getGameDecount
} from '../game';

const state = {
    isGameStarted: true,
    modal: {
        display:true,
        message: 'fakeModalMessage',
    },
    roomName: 'room1',
    me: 'lcharvol',
    users: [
        {
            name: 'lcharvol',
            owner: true,
            board: 'fakeUser1Board',
            pieces: [
                {
                    value: 1,
                    color: 'red',
                }
            ],
            score: 100,
        },
        {
            name: 'lcharvol2',
            owner: false,
            board: 'fakeUser2Board',
            pieces: [
                {
                    value: 1,
                    color: 'red',
                }
            ],
            score: 200,
        }
    ],
    toasts: ['fakeToast1', 'fakeToast2'],
    errorMessage: 'fakeErrorMessage',
    gameDecount: false
};

const emptyState = { game: {}};

describe('Selectors: ', () => {

    describe('getIsGameStarted: ', () => {
        test('should return true', () => {
            const expectedRes = true;
            const res = getIsGameStarted(state);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getDisplayModal: ', () => {
        test('should return true', () => {
            const expectedRes = true;
            const res = getDisplayModal(state);

            expect(res).toBe(expectedRes);
        });
        test('should return false', () => {
            const expectedRes = false;
            const res = getDisplayModal(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getModalMessage: ', () => {
        test('should return the right modal message', () => {
            const expectedRes = 'fakeModalMessage';
            const res = getModalMessage(state);

            expect(res).toBe(expectedRes);
        });
        test('should return am empty string', () => {
            const expectedRes = '';
            const res = getModalMessage(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getMe: ', () => {
        test('should return the right user name', () => {
            const expectedRes = 'lcharvol';
            const res = getMe(state);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getEnemyName: ', () => {
        test('should return the right enemy name', () => {
            const expectedRes = 'lcharvol2';
            const res = getEnemyName(state);

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getEnemyName({ game: { users: [] } });

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getEnemyName(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getOwner: ', () => {
        test('should return the true', () => {
            const expectedRes = true;
            const res = getOwner(state);

            expect(res).toBe(expectedRes);
        });
        test('should return false', () => {
            const expectedRes = false;
            const res = getOwner({
                game: {
                    me: 'lcharvol',
                    users: [
                        {
                            name: 'lcharvol',
                            owner: false,
                            board: 'fakeUser1Board',
                        },
                        {
                            name: 'lcharvol2',
                            owner: true,
                            board: 'fakeUser2Board',
                        }
                    ],
                }
            });

            expect(res).toBe(expectedRes);
        });
        test('should return false', () => {
            const expectedRes = false;
            const res = getOwner({
                game: {
                    me: 'lcharvol',
                    users: undefined
                }
            });

            expect(res).toBe(expectedRes);
        });
        test('should return false', () => {
            const expectedRes = false;
            const res = getOwner(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getRoomName: ', () => {
        test('should return the right room name', () => {
            const expectedRes = 'room1';
            const res = getRoomName(state);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getMyBoard: ', () => {
        test('should return my board', () => {
            const expectedRes = 'fakeUser1Board';
            const res = getMyBoard(state);

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getMyBoard(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getEnemyBoard: ', () => {
        test('should return enemy board', () => {
            const expectedRes = 'fakeUser2Board';
            const res = getEnemyBoard(state);

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getEnemyBoard({ game: { users: [] } });

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getEnemyBoard(emptyState);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getToasts: ', () => {
        test('should return toasts', () => {
            const expectedRes = ['fakeToast1', 'fakeToast2'];
            const res = getToasts(state);

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getErrorMessage: ', () => {
        test('should return the right error message', () => {
            const expectedRes = 'fakeErrorMessage';
            const res = getErrorMessage(state);

            expect(res).toBe(expectedRes);
        });
    });

    describe('getUsers: ', () => {
        test('should return users', () => {
            const expectedRes = [
                {
                    name: 'lcharvol',
                    owner: true,
                    board: 'fakeUser1Board',
                    pieces: [
                        {
                            value: 1,
                            color: 'red',
                        }
                    ],
                    score: 100,
                },
                {
                    name: 'lcharvol2',
                    owner: false,
                    board: 'fakeUser2Board',
                    pieces: [
                        {
                            value: 1,
                            color: 'red',
                        }
                    ],
                    score: 200,
                }
            ];
            const res = getUsers(state);

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getUsersNames: ', () => {
        test('should return users names', () => {
            const expectedRes = ['lcharvol', 'lcharvol2'];
            const res = getUsersNames(state);

            expect(res).toEqual(expectedRes);
        });
        test('should return an empty array', () => {
            const expectedRes = [];
            const res = getUsersNames(emptyState);

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getOwnerName: ', () => {
        test('should return users names', () => {
            const expectedRes = 'lcharvol';
            const res = getOwnerName(state);

            expect(res).toBe(expectedRes);
        });
        test('should return undefined', () => {
            const expectedRes = undefined;
            const res = getOwnerName(emptyState);

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getNextPieces: ', () => {
        test('should return next pieces', () => {
            const expectedRes = [{ value: 1, color: 'red' }];
            const res = getNextPieces(state);

            expect(res).toEqual(expectedRes);
        });
        test('should return an empty array', () => {
            const expectedRes = [];
            const res = getNextPieces(emptyState);

            expect(res).toEqual(expectedRes);
        });
        test('should return an empty array', () => {
            const expectedRes = [];
            const res = getNextPieces(({ game: { me: 'lcharvol', users: [{ name: 'lcharvol' }] } }));

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getMyScore: ', () => {
        test('should return my score', () => {
            const expectedRes = 100;
            const res = getMyScore(state);

            expect(res).toEqual(expectedRes);
        });
        test('should return 0', () => {
            const expectedRes = 0;
            const res = getMyScore(emptyState);

            expect(res).toEqual(expectedRes);
        });
    });

    describe('getGameDecount: ', () => {
        test('should return false', () => {
            const expectedRes = false;
            const res = getGameDecount(state);

            expect(res).toEqual(expectedRes);
        });
    });
});