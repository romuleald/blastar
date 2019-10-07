import * as R from 'ramda';
import {PLAYERS} from '../constants/reducerKeys';

export const selectIsCardViewerVisible = R.path([PLAYERS, 'isCardViewerVisible']);

export const selectCardListToView = R.path([PLAYERS, 'cardListToView']);
