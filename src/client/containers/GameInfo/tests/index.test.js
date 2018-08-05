import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'


import { GameInfo } from '../index';
import {
    Container,
    Label,
    Name,
    OwnerLabel,
    MeIcon
} from '../styles';

configure({ adapter: new Adapter() });

describe('GameInfo:', () => {
    describe('index.js:', () => {
        const props = {
            me: 'lcharvol',
            usersNames: ['lcharvol', 'lcharvol2'],
            owner: 'lcharvol', 
        }
        const wrapper = shallow(<GameInfo {...props}/>);

        it('Should find a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('Should find a Label with the number of player', () => {
            expect(wrapper.find(Label).length).toBe(1);
        });
        it('Should find two Name', () => {
            expect(wrapper.find(Name).length).toBe(2);
        });
        it('Should find a OwnerLabel', () => {
            expect(wrapper.find(OwnerLabel).length).toBe(1);
        });
        it('Should find a MeIcon', () => {
            expect(wrapper.find(MeIcon).length).toBe(1);
        });
        it('Should find no MeIcon and no OwnerLabel', () => {
            const props = {
                me: 'werfewfr',
                usersNames: ['lcharvol', 'lcharvol4'],
                owner: 'lcharvol2', 
            }
            const wrapper = shallow(<GameInfo {...props}/>);
            expect(wrapper.find(OwnerLabel).length).toBe(0);
            expect(wrapper.find(MeIcon).length).toBe(0);
        });
    });
});