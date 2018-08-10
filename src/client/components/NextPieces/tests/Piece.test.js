import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components'

import {
    PieceContainer,
    PieceContent,
    Cell
} from '../styles';
import Piece from '../Piece';

configure({ adapter: new Adapter() });

describe('Piece:', () => {
    describe('index.js:', () => {
        // GIVEN
        const props = {
            piece: {
                piece: [[ 0, 1, 1, 1]],
                version: 0,
            },
            size: 1,
            opacity: 1,
            pieceId: 0,
            color: 'red',
        }
        const wrapper = mount(<Piece {...props}/>);

        it('Should find a PieceContainer', () => {
            expect(wrapper.find(PieceContainer).length).toBe(1);
        });
        it('Should find a PieceContent with props style', () => {
            expect(wrapper.find(PieceContent).length).toBe(1);
            expect(wrapper.find(PieceContent)).toHaveStyleRule("width", '44px');
            expect(wrapper.find(PieceContent)).toHaveStyleRule("height", '44px');
            expect(wrapper.find(PieceContent)).toHaveStyleRule("opacity", "1");
            expect(wrapper.find(PieceContent)).toHaveStyleRule("transform", 'scale(1)');
        });
        it('Should find a PieceContent with (another) props style', () => {
            const props = {
                piece: {
                    piece: [[ 1, 1, 1, 1]],
                    version: 0,
                },
                size: 0.6,
                opacity: 0.5,
                pieceId: 0,
            }
            const wrapper = mount(<Piece {...props}/>);

            expect(wrapper.find(PieceContent).length).toBe(1);
            expect(wrapper.find(PieceContent)).toHaveStyleRule("width", '44px');
            expect(wrapper.find(PieceContent)).toHaveStyleRule("height", '44px');
            expect(wrapper.find(PieceContent)).toHaveStyleRule("opacity", "0.5");
            expect(wrapper.find(PieceContent)).toHaveStyleRule("transform", 'scale(0.6)');
        });
        it('Should find 4 Cell with proper props', () => {
            expect(wrapper.find(Cell).length).toBe(4);
            expect(wrapper.find(Cell).first()).toHaveStyleRule("background-color", 'transparent');
        });
    });
});