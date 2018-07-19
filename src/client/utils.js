import { length } from 'ramda';

import { CELLS_COLORS } from './constants/colors';

export const getRandomNumber = (min , max) => {
    return Math.round(min + Math.random() * (max - min));
};

export const getCellColor = () => CELLS_COLORS[getRandomNumber(0, length(CELLS_COLORS) - 1)];