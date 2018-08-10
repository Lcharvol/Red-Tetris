import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'

import NextPieces from '../index';
import {
    Container,
} from '../styles';
import Piece from '../Piece';

configure({ adapter: new Adapter() });

describe('NextPieces:', () => {
    describe('index.js:', () => {
        // GIVEN
        const props = {
            pieces: [
                { id: 0 },
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ],
            multiPlayers: false
        }
        const wrapper = shallow(<NextPieces {...props}/>);

        it('Should find a Container with a 10px top proprety', () => {
            expect(wrapper.find(Container).length).toBe(1);
            expect(wrapper.find(Container).props().multiPlayers).toEqual(false);
            expect(wrapper.find(Container)).toHaveStyleRule("top", '10px');
        });

        it('Should find a Container with a 220px top proprety', () => {
            const props = {
                pieces: [
                    { id: 0 },
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ],
                multiPlayers: true
            }
            const wrapper = shallow(<NextPieces {...props}/>);
            expect(wrapper.find(Container)).toHaveStyleRule("top", '220px');
        });
        it('Should find 2 Pieces', () => {
            expect(wrapper.find(Piece).length).toBe(2);
        });
        it('Should find 2 Pieces', () => {
            // GIVEN
            const props = {
                pieces: [
                    { id: 0 },
                    { id: 1 }
                ],
                multiPlayers: false
            }
            const wrapper = shallow(<NextPieces {...props}/>);
            expect(wrapper.find(Piece).length).toBe(2);
        });
        it('Should find 1 Pieces', () => {
            // GIVEN
            const props = {
                pieces: [
                    { id: 0 }
                ],
                multiPlayers: false
            }
            const wrapper = shallow(<NextPieces {...props}/>);
            expect(wrapper.find(Piece).length).toBe(1);
        });
    });
});