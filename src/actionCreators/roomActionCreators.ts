import {emitAction} from '../helpers/socket';
import {actions} from '../constants/roomConstants';

export const isPseudoAvailable = emitAction(
    (pseudo: string) => ({
        type: actions.IS_PSEUDO_AVAILABLE,
        data: {pseudo}
    }),
    'room'
);

export const getisPseudoAvailable = ({status}: {status: boolean}) => ({
    type: actions.IS_PSEUDO_AVAILABLE_STATUS,
    data: {status}
});
