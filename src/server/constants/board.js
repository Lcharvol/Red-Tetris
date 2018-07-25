import { map } from 'ramda';

import { FAKE_CELL_COLOR } from './colors';

export const initialBoard = map(() => ({
    value: 0,
    color: FAKE_CELL_COLOR,
    active: false,
  }),new Array(200));