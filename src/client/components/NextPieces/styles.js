import styled from 'styled-components';
import { CELL_MARGIN } from '../../constants/cell';

export const Container = styled.div`
    position:absolute;
    width:100px;
    display:flex;
    flex-direction:column;
    padding:10px;
    top:${({ multiPlayers }) => multiPlayers ? '220px' : '10px'};
    right:-115px;
`;

export const PieceContainer = styled.div`
    position:relative;
    -webkit-transition: top 0.5s ease-in-out;
    width:calc(100% - 10px);
    height:75px;
    display:flex;
    justify-content: center;
    align-items: center;
    margin:15px 5px 15px 5px;
`;

export const PieceContent = styled.div`
    position:relative;
    display:flex;
    flex-wrap:wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width:${({ pieceWidth }) => pieceWidth * (20 + (2 * CELL_MARGIN))}px;
    height:${({ pieceWidth }) => pieceWidth * (20 + (2 * CELL_MARGIN))}px;
    opacity: ${({ opacity }) => opacity};
    transform: scale(${({ size }) => size});
`;

export const Cell = styled.div`
    position:relative;
    width:20px;
    height:20px;
    background-color: ${({ value, color }) => value === 0 ? 'transparent' : color};
    margin: ${CELL_MARGIN}px;
`;