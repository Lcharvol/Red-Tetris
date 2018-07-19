import styled from 'styled-components';

import { DARK_MAIN_COLOR } from '../../constants/colors';
import { CASE_SIZE, CASE_MARGIN } from '../../constants';

export const Container = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color:${DARK_MAIN_COLOR};
    width:${(CASE_SIZE * 10) + (CASE_MARGIN * 20)}px;
    height:${(CASE_SIZE * 20)+ (CASE_MARGIN * 40)}px;
    border-radius:3px;
    padding:10px;
    margin:25px;
`;