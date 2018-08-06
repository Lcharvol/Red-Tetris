import configureStore from 'redux-mock-store' //ES6 modules

const middlewares = []
const mockStore = configureStore(middlewares)

const setModalMessage = () => ({ type: 'SET_MODAL_MESSAGE' })
const deleteModalMessage = () => ({ type: 'DELETE_MODAL_MESSAGE' })
const updateGameInfo = () => ({ type: 'UPDATE_GAME_INFO' })
const removeToast = () => ({ type: 'REMOVE_TOAST' })
const setErrorMessage = () => ({ type: 'SET_ERROR_MESSAGE' })

describe('Redux action', () => {
  describe('Should dispatch properly actions', () => {
    it('setModalMessage', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setModalMessage())

      const actions = store.getActions()
      const expectedPayload = { type: 'SET_MODAL_MESSAGE' }
      expect(actions).toEqual([expectedPayload])
    });
    it('deleteModalMessage', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(deleteModalMessage())

      const actions = store.getActions()
      const expectedPayload = { type: 'DELETE_MODAL_MESSAGE' }
      expect(actions).toEqual([expectedPayload])
    });
    it('updateGameInfo', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(updateGameInfo())

      const actions = store.getActions()
      const expectedPayload = { type: 'UPDATE_GAME_INFO' }
      expect(actions).toEqual([expectedPayload])
    });
    it('removeToast', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(removeToast())

      const actions = store.getActions()
      const expectedPayload = { type: 'REMOVE_TOAST' }
      expect(actions).toEqual([expectedPayload])
    });
    it('setErrorMessage', () => {
      const initialState = {}
      const store = mockStore(initialState)

      store.dispatch(setErrorMessage())

      const actions = store.getActions()
      const expectedPayload = { type: 'SET_ERROR_MESSAGE' }
      expect(actions).toEqual([expectedPayload])
    });
  });
});