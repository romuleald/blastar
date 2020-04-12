import {createMiddleware} from '../helpers/redux';
import {actions as gameConstants} from '../constants/gameConstants';
import {actions as roomConstants} from '../constants/roomConstants';
import {setRoomId} from '../actionCreators/gameActionCreators';
import {getisPseudoAvailable} from '../actionCreators/roomActionCreators';
import io from 'socket.io-client';

const roomSocket = io(`${process.env.REACT_APP_SOCKET_IO_ENV}/room`);

export const roomMiddleWare = createMiddleware({
    [gameConstants.REQUEST_ROOM_ID]: ({store, next, action}) => {
        next(action);

        roomSocket.on('SOCKET/GET_ROOM_ID', (roomId: number) => {
            store.dispatch(setRoomId(roomId));
        });
    },
    [roomConstants.IS_PSEUDO_AVAILABLE]: ({store, next, action}) => {
        next(action);

        roomSocket.on(roomConstants.IS_PSEUDO_AVAILABLE_STATUS, (status: boolean) => {
            store.dispatch(getisPseudoAvailable({status}));
        });
    }
});
