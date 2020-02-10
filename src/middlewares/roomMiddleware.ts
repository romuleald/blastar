// import * as R from 'ramda';
import {createMiddleware} from '../helpers/redux';
import {actions} from '../constants/gameConstants';
import {setRoomId} from '../actionCreators/gameActionCreators';
import io from 'socket.io-client';

const roomSocket = io(`${process.env.REACT_APP_SOCKET_IO_ENV}/room`);

export const roomMiddleWare = createMiddleware({
	[actions.REQUEST_ROOM_ID]: async ({store, next, action}) => {
		next(action);

		await roomSocket.on('SOCKET/GET_ROOM_ID', (roomId: number) => {
			store.dispatch(setRoomId(roomId));
		});
	}
});
