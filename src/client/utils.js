import {
    length,
    dropLast,
    indexOf,
    drop,
} from 'ramda';
import parse from 'url-parse';

import { CELLS_COLORS } from './constants/colors';

export const getRandomNumber = (min , max) => Math.round(min + Math.random() * (max - min));

export const getCellColor = () => CELLS_COLORS[getRandomNumber(0, length(CELLS_COLORS) - 1)];

export const getRoomName = str => {
    const endOfWord = indexOf('[', str) >= 0 ? indexOf('[', str) : length(str);
    const toCut = length(str) - endOfWord;

    if(indexOf('#', str) < 0)
        return undefined;
    return drop(1, dropLast(toCut, str));
};
  
export const getUser = str => {
    const toCut = indexOf('[', str) + 1;
    
    if(toCut === 0)
        return undefined;
    return dropLast(1, drop(toCut, str));
};

export const getParsedGameUrl = gameUrl => parse(gameUrl);