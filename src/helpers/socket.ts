/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client';

// Helper to emit a redux action to our websocket server
export const emitAction = (actionCreator, route: string) => {
    const socket = io(`${process.env.REACT_APP_SOCKET_IO_ENV}/${route}`);
    return (...args) => {
        // This return the action object which gets sent to our backend
        // server via the socket connection
        const result = actionCreator.apply(this, args)
        socket.emit(result.key, {
            ...result.data,
            type: result.type
        });
        return result;
    }
}