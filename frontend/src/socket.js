import { io }
from "socket.io-client";

const socket = io(
  "https://society-management-app-production-3b8b.up.railway.app",
  {
    transports: ["websocket"],
    withCredentials: true,
  }
);

export default socket;