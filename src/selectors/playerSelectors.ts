import * as R from 'ramda';
import {PLAYERS} from '../constants/reducerKeys';

export const selectPlayers = R.path([PLAYERS, 'players']);

export const selectPlayerList = R.pipe(
    selectPlayers,
    R.values
);
