import React from 'react';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'

import Board from '../index';
import GameModal from '../../../components/GameModal';
import Cell from '../../../components/Cell';
import {
    Back,
    Container,
    InnerBoard
} from '../styles';
import { INITIAL_BOARD } from '../../../constants/board';

configure({ adapter: new Adapter() });

describe('Board:', () => {
    describe('index.js:', () => {
        const props = {
            board: [
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 0 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
                { value: 1 },
            ],
            displayModal: false,
            modalMessage: '',
            opacity: 1,
            isSmall: false,
            size: 1,
        }
        const wrapper = mount(<Board {...props}/>);

        it('Should find a Back', () => {
            expect(wrapper.find(Back).length).toBe(1);
        });
        it('Should find a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('Should find a GameModal', () => {
            expect(wrapper.find(GameModal).length).toBe(1);
        });
        it('Should find a GameModal with 0.6 opacity', () => {
            const props = {
                board: [
                    { value: 0 },
                ],
                displayModal: true,
                modalMessage: 'fakeModalMessage',
                opacity: 1,
            }
            const wrapper = mount(<Board {...props}/>);
            expect(wrapper.find(GameModal).length).toBe(1);
            expect(wrapper.find(GameModal).props().value).toBe('fakeModalMessage');
            expect(wrapper.find(GameModal)).toHaveStyleRule("opacity", "0.6");
        });
        it('Should find a GameModal with 0 opacity', () => {
            const props = {
                board: [
                    { value: 0 },
                ],
                displayModal: false,
                modalMessage: '',
                opacity: 1,
            }
            const wrapper = mount(<Board {...props}/>);
            expect(wrapper.find(GameModal).length).toBe(1);
            expect(wrapper.find(GameModal).props().value).toBe('');
            expect(wrapper.find(GameModal).props().opacity).toBe(0);
        });
        it('Should not find a InnerBoard', () => {
            expect(wrapper.find(InnerBoard).length).toBe(1);
        });
        it('Should not find a 13 Cells', () => {
            expect(wrapper.find(Cell).length).toBe(13);
        });
        it('Should get default props when no props given', () => {
            const wrapper = mount(<Board/>);
            expect(wrapper.prop('board')).toEqual(undefined);
            expect(wrapper.prop('displayModal')).toEqual(undefined);
            expect(wrapper.prop('modalMessage')).toEqual(undefined);
        });
    });
});