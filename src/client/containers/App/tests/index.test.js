import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { App } from '../index';
import Title from '../../../components/Title';
import ErrorModal from '../../../components/ErrorModal';
import {
    AppContainer,
    BoardContainer
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
    });
});