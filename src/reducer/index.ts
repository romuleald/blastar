import {playersReducer} from './players-reducer';
import {combineReducers} from 'redux';
import {PLAYERS} from '../constants/reducerKeys';

export const rootReducer = combineReducers({
    [PLAYERS]: playersReducer
});
