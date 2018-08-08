import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    color:white;
    font-size:2em;
    font-weight:700;
    transition: opacity 1s ease-in-out 1s, transform 0.1s ease-in-out, margin-top 0.1s ease-in-out;
    opacity:${({ opacity }) => opacity};
    margin-top:${({ size }) => size === 1 ? 0 : -3}px;
    transform: scale(${({ size }) => size});
    text-shadow:
        0 0 5px #fff, 0 0 10px #fff,
        0 0 20px rgba(226, 47, 54,0.7),
        0 0 30px rgba(226, 47, 54,0.6),
        0 0 40px rgba(226, 47, 54,0.5);
`;