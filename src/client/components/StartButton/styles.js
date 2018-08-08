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
    &:before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%)scaleY(1)scaleX(1.25);
        top: 100%;
        width: 140%;
        height: 180%;
        background-color: rgba(0, 0, 0, 0.05);;
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55,0,0.1,1);;
        z-index: -1;
    }
    &:after: {
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%)scaleY(1)scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background: ${MAIN_RED};
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55,0,0.1,1);;
        z-index: -1;
    }
    &:hover {
        color: ${DARK_MAIN_COLOR};
        border: 1px solid ${DARK_MAIN_COLOR};
        &:before {
          top: -35%;
          background: ${MAIN_RED};
          transform: translateX(-50%)scaleY(1.3)scaleX(0.8);
        }
        
        &:after {
          top: -45%;
          background: ${MAIN_RED};
          transform: translateX(-50%)scaleY(1.3)scaleX(0.8);
        }
    }
`;