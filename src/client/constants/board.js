import { map } from 'ramda';

import { FAKE_CELL_COLOR } from './colors';

export const BOARD_WIDTH = 10;

export const BOARD_HEIGHT = 20;

export const BOARD_LENGTH = BOARD_WIDTH * BOARD_HEIGHT;

export const INITIAL_BOARD = map(() => ({
    value: 0,
    color: FAKE_CELL_COLOR,
    active: false,
  }),new Array(200));