import styled from 'styled-components';

import { MAIN_RED, CELLS_COLORS } from '../../constants/colors';

export const Container = styled.div`
    position:relative;
    margin-top:75px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TopText = styled.div`
    font-size:4em;
    font-weight:400;
    background: -webkit-linear-gradient(${CELLS_COLORS[2]}, ${CELLS_COLORS[0]});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const BottomText = styled.div`
    font-size:7em;
    font-weight:800;
    margin-top:-70px;
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${CELLS_COLORS[0]}, 0 0 30px ${CELLS_COLORS[0]}, 0 0 40px ${CELLS_COLORS[0]}, 0 0 55px ${CELLS_COLORS[0]}, 0 0 75px ${CELLS_COLORS[0]};
`;