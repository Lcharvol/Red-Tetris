import styled from 'styled-components';
import { MAIN_RED, DARK_MAIN_COLOR, CELLS_COLORS } from '../../constants/colors';

export const Container = styled.div`
    position:absolute;
    top:10px;
    right:-125px;
    display:flex;
    background-color:${CELLS_COLORS[1]};
    border-radius:2px;
    margin: 0px 10px 30px 10px;
    padding:3px;
    @media only screen and (max-width: 600px) {
        position:relative;
        right:10px;
    }
`;

export const Content = styled.div`
    background:${DARK_MAIN_COLOR};
    position:relative;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    width:100px;
    height:200px;
    border-radius:2px;
`;

export const EmptyCell = styled.div`
    display:flex;
    width:10px;
    height:10px;
`;

export const FullCell = styled.div`
    display:flex;
    width:10px;
    height:10px;
    background-color:${CELLS_COLORS[1]};
`;