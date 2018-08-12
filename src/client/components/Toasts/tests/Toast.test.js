import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toast  from '../Toast';
import {
    ToastContainer
} from '../styles';

configure({ adapter: new Adapter() });

describe('Toast:', () => {
    describe('index.js:', () => {
        const props = {
           text: 'fakeText',
           active: true,
        }
        const wrapper = mount(<Toast {...props}/>);
        it('Should find a ToastContainer', () => {
            expect(wrapper.find(ToastContainer).length).toBe(1);
            expect(wrapper.find(ToastContainer).props().isMounted).toEqual(false);
            expect(wrapper.find(ToastContainer).props().active).toEqual(true);
        });
    });
});