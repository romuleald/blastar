/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client';

// Helper to emit a redux action to our websocket server
export const emitAction = (actionCreator, socketRoute: string) => {
	const socket = io(`${process.env.REACT_APP_SOCKET_IO_ENV}/${socketRoute}`);
	return (...args) => {
		// This return the action object which gets sent to our backend
		// server via the socket connection
		const result = actionCreator.apply(this, args);
		console.log(`Emitting, ${result.type}`);
		socket.emit(result.type, {
			...result.data
		});

		return result;
	};
};
