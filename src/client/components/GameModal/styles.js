import styled from 'styled-components';

export const Container = styled.div`
    position:absolute;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color:rgba(25,25,25,0.5);
    width:calc(100% - 20px);
    height:200px;
    top:calc(50% - 100px);
    color:white;
    font-size:10em;
    z-index:1000;
`;