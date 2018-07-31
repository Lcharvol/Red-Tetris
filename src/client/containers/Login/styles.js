import styled from 'styled-components';

import { LIGHT_MAIN_COLOR } from '../../constants/colors';

export const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    width:400px;
    height:400px;
    background-color:${LIGHT_MAIN_COLOR};
    border-radius:3px;
`;

export const LoginInput = styled.input`

`;