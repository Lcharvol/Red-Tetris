import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'


import Spectre from '../index';
import {
    Container,
    Content,
    EmptyCell,
    FullCell
} from '../styles';

configure({ adapter: new Adapter() });

describe('Spectre:', () => {
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
            ],
        }
        const wrapper = shallow(<Spectre {...props}/>);

        it('Should find a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        it('Shouldf find a Content', () => {
            expect(wrapper.find(Content).length).toBe(1);
        });
        it('Shouldf find 5 EmptyCell', () => {
            expect(wrapper.find(EmptyCell).length).toBe(5);
        });
        it('Shouldf find 5 FullCell', () => {
            expect(wrapper.find(FullCell).length).toBe(6);
        });
    });
});