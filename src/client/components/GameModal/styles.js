import styled from 'styled-components';

export const Container = styled.div`
    position:absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    background-color:rgba(25,25,25,0.5);
    width:calc(100% - 50px);
    height:calc(100% - 50px);
    color:white;
    padding:15px;
    font-size:3.5em;
    z-index:1000;
    transition: opacity 0.2s ease-in-out
    opacity:${({ opacity }) => opacity};
`;