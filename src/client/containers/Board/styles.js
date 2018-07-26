import styled from 'styled-components';

import { DARK_MAIN_COLOR, MAIN_RED } from '../../constants/colors';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const Container = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    border-radius:3px;
    padding:10px;
    margin-top:30px;
    margin-bottom:30px;
    margin-right:10px;
    margin-left:10px;
    background: url('https://i.pinimg.com/736x/b6/f7/97/b6f797a70b411b2d6c4481dac17a323a--d-texture-paint-texture.jpg');
    background-repeat: repeat;
    -moz-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    -o-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    filter:progid:DXImageTransform.Microsoft.Shadow(color=rgba(0,0,0,0.3), Direction=NaN, Strength=50);
    transition: opacity 1s;
    opacity: ${({ size }) => size};
    width: ${({ size }) => size === 0 ? '0px' : '100%'}
    overflow:hidden;
`;

export const InnerBoard = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width:${(CELL_SIZE * 10) + (CELL_MARGIN * 20)}px;
    height:${(CELL_SIZE * 20)+ (CELL_MARGIN * 40)}px;
    background:${MAIN_RED};
    padding:10px;
    border-radius:2px;
    -moz-box-shadow: inset 0px 0px 50px 7px rgba(0,0,0,0.7);
    -webkit-box-shadow: inset 0px 0px 50px 7px rgba(0,0,0,0.7);
    -o-box-shadow: inset 0px 0px 50px 7px rgba(0,0,0,0.7);
    box-shadow: inset 0px 0px 50px 7px rgba(0,0,0,0.7);
    filter:progid:DXImageTransform.Microsoft.Shadow(color=rgba(0,0,0,0.7), Direction=NaN, Strength=50);
    overflow: hidden;
`;