import styled from "styled-components";

import {
    MAIN_COLOR,
} from '../../constants';

export const AppContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height:100vh;
    background-color:${MAIN_COLOR};
`;

export const BoardContainer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
`;