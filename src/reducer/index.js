import {playersReducer} from './players-reducer';
import {combineReducers} from 'redux';
import {PLAYERS} from '../constants/reducerKeys';

const rootReducer = combineReducers({
    [PLAYERS]: playersReducer
});

export default rootReducer;