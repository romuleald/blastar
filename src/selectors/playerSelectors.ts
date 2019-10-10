import * as R from 'ramda';
import {PLAYERS} from '../constants/reducerKeys';
import {PlayerState} from './../reducer/players-reducer.type';

export const selectPlayers = R.path([PLAYERS, 'players']);

// TODO: Replace any with the correct type when we split the reducers and flatten the state
export const selectPlayerList: (state: any) => PlayerState[] = R.pipe(
    selectPlayers,
    R.values
);
