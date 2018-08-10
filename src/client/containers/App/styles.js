import styled from "styled-components";

import {
    MAIN_COLOR,
} from '../../constants';

export const Texture = styled.div`
    display:flex;
    width: 100vw;
    height:100vh;
    background-color:black;
`;

export const AppContainer = styled.div`
    position:relative;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height:100%;
    -webkit-font-smoothing: antialiased;
    background:${MAIN_COLOR};
    background-blend-mode: multiply,multiply;
    overflow: hidden;
    font-family: 'Abel', sans-serif;
    user-select: none;
`;

export const BoardContainer = styled.div`
    position:relative;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom:15px;
`;

export const ToastsContainer = styled.div`
    position:absolute;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction:column;
    top:0;
    left:0;
    padding:20px;
    z-index:1000;
`;