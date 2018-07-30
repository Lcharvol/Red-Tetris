import styled from 'styled-components';

import { MAIN_RED } from '../../constants/colors';

export const Container = styled.div`
    position:absolute;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    left:35px;
    bottom:25px;
    min-width:200px;
    min-height:50px;
    color:white;
`;

export const Label = styled.div`
    font-size:2.5em;
    font-weight:600;
    background:${MAIN_RED};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const Name = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    font-size:1.3em;
    font-weight:100; 
    color:white;
    margin-left:15px;
    margin-top:5px;
    margin-bottom:5px;
`;

export const OwnerIcon = styled.div`
    position:relative;
    display:flex;
    width:10px;
    height:10px;
    border-radius:100%;
    background:${MAIN_RED};
    margin-left:15px;
`;