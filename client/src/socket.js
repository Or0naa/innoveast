import { io } from 'socket.io-client';

// const URL = 'http://localhost:9876';
const URL = 'https://innoveast.onrender.com';
export const socket = io(URL, {
  // autoConnect: false,
});
