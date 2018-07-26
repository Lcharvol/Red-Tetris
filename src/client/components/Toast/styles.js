import styled from 'styled-components';

export const Container = styled.div`
    position:absolute;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:rgba(40,40,40,0.8);
    min-width:200px;
    height:40px;
    border-radius: 3px;
    padding-left:10px;
    padding-right:10px;
    top:25px;
    left:25px;
    color:white;
    font-weight:0;
    opacity: ${({ opacity }) => opacity};
`;