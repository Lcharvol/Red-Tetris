import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import EventListener from 'react-event-listener';

import { App } from '../index';
import Title from '../../../components/Title';
import Score from '../../../components/Score';
import ErrorModal from '../../../components/ErrorModal';
import NextPieces from '../../../components/NextPieces';
import StartButton from '../../../components/StartButton';
import WaitingLabel from '../../../components/WaitingLabel';
import Toast from '../../../components/Toast';
import GameInfo from '../../GameInfo';
import Spectre from '../../Spectre';
import {
    AppContainer,
    BoardContainer,
    ToastsContainer
} from '../styles';

configure({ adapter: new Adapter() });

describe('Board:', () => {
    const initialState = {game:{
        isGameStarted: false,
        displayModal: false,
        toasts: [],
        modalMessage: '',
        errorMessage: undefined,
        me: 'lcharvol',
        gameName: undefined,
        users: [],
        usersNames: [],
    }}
    const mockStore = configureStore()
    let store,wrapper;
    const props = {
    }
    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><App {...props}/></Provider> )
    })

    describe('index.js:', () => {
        it('Should find a AppContainer', () => {
            expect(wrapper.find(AppContainer).length).toBe(1);
        });
        it('Should find a Title', () => {
            expect(wrapper.find(Title).length).toBe(1);
            expect(wrapper.find(Title).props().topValue).toBe('Red');
            expect(wrapper.find(Title).props().bottomValue).toBe('Tetris');
        });
        it('Should find a ErrorModal', () => {
            const props = {
                errorMessage: 'fakeErrorMessage',
            }
            wrapper = mount( <Provider store={store}><App {...props}/></Provider> )
            expect(wrapper.find(ErrorModal).length).toBe(1);
            expect(wrapper.find(ErrorModal).props().value).toBe('fakeErrorMessage');
        });
        it('Should not find a ErrorModal', () => {
            const props = {
                errorMessage: undefined,
            }
            wrapper = mount( <Provider store={store}><App {...props}/></Provider> )
            expect(wrapper.find(ErrorModal).length).toBe(0);
        });
        it('Should not find a BoardContainer', () => {
            const props = {
                errorMessage: undefined,
                me: undefined,
            }
            wrapper = mount( <Provider store={store}><App {...props}/></Provider> )

            expect(wrapper.find(BoardContainer).length).toBe(0);
        });
        it('Should find a BoardContainer', () => {
            const props = {
                errorMessage: undefined,
                me: 'lcharvol',
                myBoard: [
                    {value:0,color:'red',active: false},
                    {value:0,color:'red',active: false},
                    {value:1,color:'red',active: true},
                ],
                toasts: [
                    {
                        id: 0,
                        message: 'toast1'
                    },
                    {
                        id: 1,
                        message: 'toast2'
                    }
                ],
                usersNames: ['lcharvol'],
                nextPieces: [
                    {
                        version: 0,
                        pieceId: 1,
                        piece: [
                            [1,1,1,1]
                        ]
                    }
                ],
                users: [{},{}],
                enemyBoard:[],
                isGameStarted: true,
                owner: true,
            }
            wrapper = mount( <Provider store={store}><App {...props}/></Provider> )
            expect(wrapper.find(BoardContainer).length).toBe(1);
            expect(wrapper.find(EventListener).length).toBe(1);
            expect(wrapper.find(GameInfo).length).toBe(1);

            expect(wrapper.find(ToastsContainer).length).toBe(1);
            expect(wrapper.find(Toast).length).toBe(2);

            expect(wrapper.find(Spectre).length).toBe(1);

            expect(wrapper.find(NextPieces).length).toBe(1);
            expect(wrapper.find(NextPieces).props().multiPlayers).toBe(true);

            expect(wrapper.find(Score).length).toBe(1);
            expect(wrapper.find(Score).props().opacity).toBe(1);

            expect(wrapper.find(StartButton).length).toBe(1);

            expect(wrapper.find(WaitingLabel).length).toBe(0);
        });
        it('Should find a BoardContainer', () => {
            const props = {
                errorMessage: undefined,
                me: 'lcharvol',
                myBoard: [
                    {value:0,color:'red',active: false},
                    {value:0,color:'red',active: false},
                    {value:1,color:'red',active: true},
                ],
                toasts: [
                    {
                        id: 0,
                        message: 'toast1'
                    },
                    {
                        id: 1,
                        message: 'toast2'
                    }
                ],
                usersNames: ['lcharvol'],
                nextPieces: [
                    {
                        version: 0,
                        pieceId: 1,
                        piece: [
                            [1,1,1,1]
                        ]
                    }
                ],
                users: [{},{}],
                enemyBoard:[],
                isGameStarted: false,
                owner: false,
            }
            wrapper = mount( <Provider store={store}><App {...props}/></Provider> )
            expect(wrapper.find(BoardContainer).length).toBe(1);
            expect(wrapper.find(EventListener).length).toBe(1);
            expect(wrapper.find(GameInfo).length).toBe(1);

            expect(wrapper.find(ToastsContainer).length).toBe(1);
            expect(wrapper.find(Toast).length).toBe(2);

            expect(wrapper.find(Spectre).length).toBe(1);

            expect(wrapper.find(NextPieces).length).toBe(1);
            expect(wrapper.find(NextPieces).props().multiPlayers).toBe(true);

            expect(wrapper.find(Score).length).toBe(1);
            expect(wrapper.find(Score).props().opacity).toBe(0);

            expect(wrapper.find(StartButton).length).toBe(0);

            expect(wrapper.find(WaitingLabel).length).toBe(1);
        });
    });
});