import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Score, { animateScore } from '../index';
import {
    Container,
} from '../styles';

configure({ adapter: new Adapter() });

describe('Score:', () => {
    describe('index.js:', () => {
        // GIVEN
        const props = {
            score: 0,
            opacity: 1,
            size: 1
        }
        const wrapper = mount(<Score {...props}/>);

        it('Should find a Container', () => {
            expect(wrapper.find(Container).length).toBe(1);
        });
        describe('animateScore:', () => {
            it('Should call handleChangeSize with 1.3', () => {
                const prevScore = 0;
                const score = 30;
                const handleChangeSize = jest.fn();
                animateScore(prevScore, score, handleChangeSize);
                expect(handleChangeSize).toHaveBeenCalledTimes(1);
                expect(handleChangeSize).toHaveBeenCalledWith(1.3);
            });
        });
        describe('animateScore:', () => {
            it('Should call handleChangeSize with 1.6', () => {
                const prevScore = 0;
                const score = 100;
                const handleChangeSize = jest.fn();
                animateScore(prevScore, score, handleChangeSize);
                expect(handleChangeSize).toHaveBeenCalledTimes(1);
                expect(handleChangeSize).toHaveBeenCalledWith(1.6);
            });
        });
    });
});