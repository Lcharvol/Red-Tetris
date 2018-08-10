import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import WaitingLabel from '../index';
import {
    Container,
} from '../styles';

configure({ adapter: new Adapter() });

describe('WaitingLabel:', () => {
    describe('index.js:', () => {
        // GIVEN
        const props = {
            enemyName: 'fakeEnemyName',
            opacity: 0,
        }
        const wrapper = mount(<WaitingLabel {...props}/>);
        it('ShouldFind a Container witth 1 childrens', () => {
            expect(wrapper.find(Container).length).toBe(1);
            expect(wrapper.find(Container).children().length).toBe(1);
        });
    });
});