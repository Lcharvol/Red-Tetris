import styled from 'styled-components';

import { MAIN_RED, MAIN_COLOR } from '../../constants/colors';

export const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height:40px;
    width:170px;
    background:${MAIN_RED};
    border-radius: 3px;
    cursor:pointer;
    transition: 0.2s ease-in-out;
    &:hover {
        opacity:0.7;
    };
    color:${MAIN_COLOR};
    font-size:1.7em;
`;