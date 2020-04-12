import {playersReducer} from './players-reducer';
import {combineReducers} from 'redux';
import {PLAYERS, ROOM} from '../constants/reducerKeys';
import {roomReducer} from './room.reducer';

export const rootReducer = combineReducers({
    [PLAYERS]: playersReducer,
    [ROOM]: roomReducer
});
