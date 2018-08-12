import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toast from '../index';
import {
    Container
} from '../styles';

configure({ adapter: new Adapter() });

describe('Toast:', () => {
    describe('index.js:', () => {
        const props = {
            text: 'fakeToastText'
        }
        const wrapper = shallow(<Toast {...props}/>);
        it('ShouldFind a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('ShouldFind a children', () => {
            expect(wrapper.find(Container).children().length).toBe(1);
        });
    });
});