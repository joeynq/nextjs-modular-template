import { ManagerOptions, SocketOptions } from "socket.io-client";

export const socketIoConfig: Partial<ManagerOptions & SocketOptions> = {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 5000,
  autoConnect: true,
  transports: ["websocket", "polling"],
  upgrade: false,
  query: {
    token: "my-token",
  },
};
