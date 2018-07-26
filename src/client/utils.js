import {
    length,
    dropLast,
    indexOf,
    drop,
} from 'ramda';

import { CELLS_COLORS } from './constants/colors';

export const getRandomNumber = (min , max) => Math.round(min + Math.random() * (max - min));

export const getCellColor = () => CELLS_COLORS[getRandomNumber(0, length(CELLS_COLORS) - 1)];

export const getRoomName = str => {
    const toCut = indexOf('[', str)
    return drop(1, dropLast(toCut, str))
    return str.substr(1, lastCharPos - 1);
};
  
export const getUser = str => {
    const toCut = length(str) - indexOf('[', str) - 1;
    return dropLast(1, drop(toCut, str));
};