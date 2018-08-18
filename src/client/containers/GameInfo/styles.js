import styled from 'styled-components';

import { MAIN_RED, CELLS_COLORS, LIGHT_MAIN_COLOR } from '../../constants/colors';

export const Container = styled.div`
    position:absolute;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    left:35px;
    bottom:25px;
    min-width:200px;
    min-height:120px;
    color:white;
    @media only screen and (max-width: 600px) {
        transform: scale(0.5);
        left:-30px;
        bottom:-20px;
    }
`;

export const Label = styled.div`
    font-size:2em;
    font-weight:600;
    background:${CELLS_COLORS[1]};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 3px;
`;

export const Name = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    font-size:1.2em;
    font-weight:0; 
    color:white;
    margin-left:15px;
    margin-top:5px;
    margin-bottom:5px;
`;

export const MeIcon = styled.div`
    position:relative;
    display:flex;
    width:10px;
    height:10px;
    border-radius:100%;
    background:${CELLS_COLORS[1]};
    margin-left:15px;
`;

export const OwnerLabel = styled.div`
    display:flex;
    color:${LIGHT_MAIN_COLOR};
    font-size:0.9em;
    margin-left:7.5px;
`;