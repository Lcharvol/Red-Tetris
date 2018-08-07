import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    color:white;
    font-size:2em;
    font-weight:700;
    transition: opacity 1s ease-in-out;
    transition-delay: 1s;
    opacity:${({ opacity }) => opacity};
    margin-top:-50px;
`;