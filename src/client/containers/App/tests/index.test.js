import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'

import { App } from '../index';
import {
    AppContainer,
} from '../styles';

configure({ adapter: new Adapter() });

describe('Board:', () => {
    describe('index.js:', () => {
        const props = {
        }
        const wrapper = mount(<App {...props}/>);

        it('Should find a AppContainer', () => {
            expect(wrapper.find(AppContainer).length).toBe(1);
        });
    });
});