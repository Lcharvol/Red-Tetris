import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toasts from '../index';
import Toast  from '../Toast';
import {
    ToastsContainer
} from '../styles';

configure({ adapter: new Adapter() });

describe('Toasts:', () => {
    describe('index.js:', () => {
        const props = {
            toasts: [
                {
                    message: 'toast1',
                    id: 0,
                    active: true
                }
            ]
        }
        const wrapper =  shallow (<Toasts {...props}/>);
        it('Should find a ToastsContainer', () => {
            expect(wrapper.find(ToastsContainer).length).toBe(1);
        });
        it('Should find one Toast', () => {
            expect(wrapper.find(Toast).length).toBe(1);
        });
    });
});