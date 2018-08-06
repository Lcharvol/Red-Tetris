import styled from 'styled-components';

import { CELLS_COLORS } from '../../constants/colors';

export const Container = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:rgba(60,60,60,0.7);
    height:40px;
    border-radius: 3px;
    padding-left:10px;
    padding-right:10px;
    top:25px;
    left:25px;
    color:white;
    font-weight:0;
    opacity: 0.7;
    transition: opacity 0.7s;
    margin-top:10px;
    margin-bottom:10px;
`;