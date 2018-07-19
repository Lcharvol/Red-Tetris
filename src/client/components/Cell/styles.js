import styled from 'styled-components';

import {
    CELL_SIZE,
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
    background-color:${({ color }) => color};
    border-radius:3px;
    opacity:0.8;
`;