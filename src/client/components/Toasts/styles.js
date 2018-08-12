import styled from 'styled-components';

export const ToastsContainer = styled.div`
    position:absolute;
    display:flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction:column;
    top:0;
    left:0;
    padding:20px;
    z-index:1000;
`;

export const ToastContainer = styled.div`
    position:relative;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background-color:rgba(60,60,60,0.7);
    height:${({ active }) => active ? 40 : 0 }px;
    border-radius: 3px;
    padding-left:10px;
    padding-right:10px;
    top:25px;
    color:white;
    font-weight:0;
    opacity: ${({ isMounted, active }) => isMounted && active ? 0.7 : 0};
    left: ${({ isMounted }) => isMounted ? 25 : -300 }px;
    top: ${({ active }) => active ? '' : '-200px' };
    transition:
        left 0.2s ease-in-out,
        height 0.3s ease-in-out,
        opacity 0.7s ease-in-out,
        top 1s ease-in-out;
    margin-top:10px;
    margin-bottom:10px;
`;