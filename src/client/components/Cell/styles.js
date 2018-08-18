import styled from 'styled-components';

import {
    CELL_SIZE,
    SMALL_CELL_SIZE,
    CELL_MARGIN,
    MAIN_COLOR,
    MAIN_RED,
    FAKE_CELL_COLOR,
} from '../../constants';

export const Container = styled.div`
    display:flex;
    width:${CELL_SIZE}px;
    height:${CELL_SIZE}px;
    margin: ${CELL_MARGIN}px;
    @media only screen and (max-width: 500px) {
        width:${SMALL_CELL_SIZE}px;
        height:${SMALL_CELL_SIZE}px;
        margin: ${CELL_MARGIN}px;
    }
    background-color:${({ color }) => color};
    border-radius:1px;
    opacity:0.7;
`;