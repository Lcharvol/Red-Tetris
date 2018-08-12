import styled from 'styled-components';

import { FLAT_RED, MAIN_RED, MAIN_COLOR, DARK_MAIN_COLOR } from '../../constants/colors';

export const Container = styled.div`
    display:flex;
    width:150px;
    text-align: center;
    cursor: ${({ opacity }) => opacity === 1 ? 'pointer' : 'default'};
    transition: opacity 1s ease-in-out;
    opacity:${({ opacity }) => opacity};
    transition-delay: 0.3s;
    z-index: 200;
    margin-top:-60px;
`;


export const ButtonText = styled.p`
    text-decoration: none;
    color: white;
    z-index:100;
    display: inline-block;
    padding: 12px 24px;
    border: 1px solid #4f4f4f;
    border-radius: 4px;
    transition: all 0.2s ease-in;;
    position: relative;
    overflow: hidden;
    width:100%;
    &:hover {
        border: 1px solid rgba(255, 255, 255,0.9);
        box-shadow:
            0 0 5px rgba(255, 255, 255,0.5),
            0 0 10px rgba(255, 255, 255,0.4),
            0 0 20px rgba(226, 47, 54,0.5),
            0 0 30px rgba(226, 47, 54,0.3),
            0 0 40px rgba(226, 47, 54,0.2),
            0 0 75px rgba(226, 47, 54,0.1),

            0 0 5px rgba(255, 255, 255,0.5) inset,
            0 0 10px rgba(255, 255, 255,0.4) inset,
            0 0 20px rgba(226, 47, 54,0.5) inset,
            0 0 30px rgba(226, 47, 54,0.3) inset,
            0 0 40px rgba(226, 47, 54,0.2) inset,
            0 0 75px rgba(226, 47, 54,0.1) inset;
        text-shadow:
            0 0 5px #fff, 0 0 10px #fff,
            0 0 20px rgba(226, 47, 54,0.8),
            0 0 30px rgba(226, 47, 54,0.8),
            0 0 40px rgba(226, 47, 54,0.8),
            0 0 55px rgba(226, 47, 54,0.8),
            0 0 75px rgba(226, 47, 54,0.8);
    }
`;