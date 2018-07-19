import styled from 'styled-components';

import { DARK_MAIN_COLOR } from '../../constants/colors';
import { CELL_SIZE, CELL_MARGIN } from '../../constants';

export const Container = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    background-color:${DARK_MAIN_COLOR};
    width:${(CELL_SIZE * 10) + (CELL_MARGIN * 20)}px;
    height:${(CELL_SIZE * 20)+ (CELL_MARGIN * 40)}px;
    border-radius:3px;
    padding:10px;
    margin:25px;
    background: url('https://i.pinimg.com/736x/b6/f7/97/b6f797a70b411b2d6c4481dac17a323a--d-texture-paint-texture.jpg');
    background-repeat: repeat;
`;