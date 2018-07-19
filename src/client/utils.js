import { CELLS_COLORS, FAKE_CELL_COLOR } from './constants/colors';

export const getRandomNumber = (min , max) => {
    return Math.round(min + Math.random() * (max - min));
};

export const getCellColor = value => value === 0 ? FAKE_CELL_COLOR : CELLS_COLORS[value];