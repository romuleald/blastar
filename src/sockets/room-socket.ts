import io from 'socket.io-client';

export const getRoomId = () => {
    let roomId = 0;
    io.on('GET_ROOM_ID', (room) => {
        console.log(room);
    });
    return roomId;
};