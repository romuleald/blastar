import {createReducer} from '../helpers/redux';
import {actions} from '../constants/roomConstants';

const initialState = {
    isPseudoAvailable: true
};

export const roomReducer = createReducer(
    {
        [actions.IS_PSEUDO_AVAILABLE_STATUS]: (state, {status}) => ({
            ...state,
            isPseudoAvailable: status
        })
    },
    initialState
);
