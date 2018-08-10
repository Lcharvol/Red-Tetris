import styled from 'styled-components';

export const Container = styled.div`
    color:white;
    font-size: 1.1em;
    font-weight:100;
    transition: opacity 0.7s ease-in-out;
    opacity:${({ opacity }) => opacity};
    margin-top:-50px;
    transition: opacity 1s ease-in-out;
`;