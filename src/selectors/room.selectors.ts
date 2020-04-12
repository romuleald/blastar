import * as R from 'ramda';
import {ROOM} from '../constants/reducerKeys';

export const getRoomId = state => R.path(['roomId'], state);

export const getIsPseudoAvailableSelector = state => R.path([ROOM, 'isPseudoAvailable'], state);
