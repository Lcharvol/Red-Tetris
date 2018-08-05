import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ErrorModal from '../index';
import {
    Container
} from '../styles';

configure({ adapter: new Adapter() });

describe('ErrorModal:', () => {
    describe('index.js:', () => {
        const props = {
            value: 'fakeValue',
        }
        const wrapper = shallow(<ErrorModal {...props}/>);
        it('Should find a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('Should find value as children', () => {
            expect(wrapper.find(Container).children().length).toBe(1);
        });
        it('Should find an empty value as children ', () => {
            const props = {
            }
            const wrapper = shallow(<ErrorModal {...props}/>);
            expect(wrapper.find(Container).children().length).toBe(0);
        });
    });
});