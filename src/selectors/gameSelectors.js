import * as R from 'ramda';
import {PLAYERS} from '../constants/reducerKeys';

export const selectStockCards = R.path([PLAYERS, 'stockCards']);

export const selectWasteCards = R.path([PLAYERS, 'wasteCards']);
