import { Socket, io } from 'socket.io-client';
import { getEnvVariables } from '.';

let socket: Socket;
export const getSocket = () => {
    const { VITE_BACKEND_URL } = getEnvVariables();
    if (!socket) {
        socket = io(VITE_BACKEND_URL);
    }
    return socket;
};
