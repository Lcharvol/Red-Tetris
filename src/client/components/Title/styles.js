import styled from 'styled-components';

import { MAIN_RED } from '../../constants/colors';

export const Container = styled.div`
    position:absolute;
    top:75px;
    display:flex;
    background:  ${MAIN_RED};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TopText = styled.div`
    font-size:4em;
    font-weight:400;
`;

export const BottomText = styled.div`
    font-size:7em;
    font-weight:800;
    margin-top:-50px;
`;