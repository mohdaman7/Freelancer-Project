import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  reconnection: true,
  reconnectionAttempts: Infinity, 
  reconnectionDelay: 1000, 
  reconnectionDelayMax: 5000, 
  autoConnect: true,
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem("token") 
  }
});