import { io }
from "socket.io-client";


const socket =
  io("https://society-management-app-production-3b8b.up.railway.app");


export default socket;