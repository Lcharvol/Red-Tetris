import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'


import Cell from '../index';
import {
    Container
} from '../styles';

configure({ adapter: new Adapter() });

describe('Cell:', () => {
    describe('index.js:', () => {
        const props = {
            cell: {
                color: 'red',
                value: 1,
            }
        }
        const wrapper = shallow(<Cell {...props}/>);
        it('ShouldFind a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('Cell should have the correct background-color', () => {
            expect(wrapper.find(Container)).toHaveStyleRule("background-color", props.cell.color);
        });
    });
});