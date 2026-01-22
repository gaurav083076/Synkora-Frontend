import { io } from "socket.io-client";

export const createSocketConnection = () => {
  const socketUrl = location.hostname === "localhost" 
    ? "http://localhost:3000"
    : location.origin;
  
  return io(socketUrl, {
    transports: ["websocket", "polling"],
    withCredentials: true
  });
}