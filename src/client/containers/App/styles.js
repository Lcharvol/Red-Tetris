import styled from "styled-components";

import {
    MAIN_COLOR,
} from '../../constants';

export const AppContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height:100vh;
    background-color:${MAIN_COLOR};
    overflow: hidden;
    font-family: 'Abel', sans-serif;
    user-select: none;
`;

export const BoardContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
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