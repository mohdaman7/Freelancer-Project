import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  autoConnect: true,
  auth: (cb) => {
    const token = localStorage.getItem("token");
    cb({ token });
  }
});


