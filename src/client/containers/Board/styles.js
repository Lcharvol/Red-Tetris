import styled from 'styled-components';

import { DARK_MAIN_COLOR, MAIN_RED, MAIN_COLOR } from '../../constants/colors';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const Back = styled.div`
    position:relative;
    display:flex;
    background-color:${MAIN_COLOR};
    margin: 30px 10px 30px 10px;
`;

export const Container = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    border-radius:3px;
    background-repeat: repeat;
    background:${MAIN_RED};
    -moz-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    -webkit-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    -o-box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    box-shadow: 0px 0px 50px 5px rgba(0,0,0,0.3);
    filter:progid:DXImageTransform.Microsoft.Shadow(color=rgba(0,0,0,0.3), Direction=NaN, Strength=50);
    transition: opacity 1s;
    opacity: ${({ opacity }) => opacity};
    padding:10px;
    width: 100%;
    overflow:hidden;
`;

export const Shadow = styled.div`
    position:absolute;
    width:calc(100% - 20px);
    height:calc(100% - 20px);
    -moz-box-shadow: inset 0px 0px 30px 5px rgba(20,20,20,0.4);
    -webkit-box-shadow: inset 0px 0px 30px 5px rgba(20,20,20,0.4);
    -o-box-shadow: inset 0px 0px 30px 5px rgba(20,20,20,0.4);
    box-shadow: inset 0px 0px 30px 5px rgba(20,20,20,0.4);
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
    -moz-box-shadow: inset 0px 0px 150px 70px rgba(0,0,0,0.3);
    -webkit-box-shadow: inset 0px 0px 150px 70px rgba(0,0,0,0.3);
    -o-box-shadow: inset 0px 0px 150px 70px rgba(0,0,0,0.3);
    box-shadow: inset 0px 0px 150px 70px rgba(0,0,0,0.3);
    filter:progid:DXImageTransform.Microsoft.Shadow(color=rgba(0,0,0,0.7), Direction=NaN, Strength=50);
    overflow: hidden;
`;