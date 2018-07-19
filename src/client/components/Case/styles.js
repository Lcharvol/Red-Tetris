import styled from 'styled-components';

import {
    CASE_SIZE,
    CASE_MARGIN,
    MAIN_COLOR,
    MAIN_RED,
} from '../../constants';

export const Container = styled.div`
    display:flex;
    width:${CASE_SIZE}px;
    height:${CASE_SIZE}px;
    margin: ${CASE_MARGIN}px;
    background:${({ value }) => value === 0 ? MAIN_COLOR : MAIN_RED};
`;