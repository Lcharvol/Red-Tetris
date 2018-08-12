import reducer from '../index';
import * as types from '../../actions/game';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                isGameStarted: false,
                gameDecount: false,
                displayModal: false,
                toasts: [],
                modalMessage: '',
                errorMessage: undefined,
                me: undefined,
                gameName: undefined,
            }
        )
    })
    it('should handle SET_MODAL_MESSAGE', () => {
        expect(
            reducer({}, {
            type: types.SET_MODAL_MESSAGE,
            message: 'SET_MODAL_MESSAGE'
            })
        ).toEqual(
            {
            displayModal: true,
            modalMessage: 'SET_MODAL_MESSAGE',
            }
        )
    })
    it('should handle DELETE_MODAL_MESSAGE', () => {
        expect(
            reducer({}, {
                type: types.DELETE_MODAL_MESSAGE,
            })
        ).toEqual(
            {
                displayModal: false,
                modalMessage: '',
            }
        )
    })
    it('should handle UPDATE_GAME_INFO without toasts', () => {
        const body = {
            isGameStarted: true,
            me: 'lcharvol',
            gameName: 'room1',
        }
        expect(
            reducer({}, {
                type: types.UPDATE_GAME_INFO,
                body,
            })
        ).toEqual(
            {
                isGameStarted: true,
                me: 'lcharvol',
                gameName: 'room1',
            }
        )
    })
    it('should handle UPDATE_GAME_INFO with toasts', () => {
        const body2 = {
            toasts: [],
        }
        expect(
            reducer({
                toasts: ['toast1', 'toast2']
            }, {
                type: types.UPDATE_GAME_INFO,
                body: body2,
            })
        ).toEqual(
            {
                toasts: ['toast1', 'toast2'],
            }
        )
    })
    it('should handle REMOVE_TOAST', () => {
        expect(
            reducer({
                toasts: [
                    {
                        id: 0,
                        message: 'fakeToast0',
                        active:true
                    },
                    {
                        id: 1,
                        message: 'fakeToast1',
                        active:true
                    }
                ]
            }, {
                type: types.REMOVE_TOAST,
                toastId: 0,
            })
        ).toEqual(
            {
                toasts: [
                    {
                        active: false,
                        id: 0,
                        message: "fakeToast0"
                    },
                    {
                        active: true,
                        id: 1,
                        message: "fakeToast1"
                    }
                ]
            }
        )
    })
    it('should handle REMOVE_TOAST', () => {
        expect(
            reducer({
                toasts: [
                    {
                        id: 0,
                        message: 'fakeToast0',
                        active:false
                    },
                    {
                        id: 1,
                        message: 'fakeToast1',
                        active:true
                    }
                ]
            }, {
                type: types.REMOVE_TOAST,
                toastId: 1,
            })
        ).toEqual(
            {
                toasts: [
                    {
                        active: false,
                        id: 1,
                        message: "fakeToast1"
                    }
                ]
            }
        )
    })
    it('should handle SET_ERROR_MESSAGE', () => {
        expect(
            reducer({}, {
                type: types.SET_ERROR_MESSAGE,
                message: 'fakeErrorMessage'
            })
        ).toEqual(
            {
                errorMessage: 'fakeErrorMessage'
            }
        )
    })
})