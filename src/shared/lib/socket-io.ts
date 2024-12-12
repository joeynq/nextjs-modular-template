import { socketIoConfig } from "@config/socket-io.conf";
import { WithAdapter } from "@shared/types";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export const createSocketIo = (
  url: string,
  options?: Partial<ManagerOptions & SocketOptions>
) => {
  const socket = io(url, {
    ...socketIoConfig,
    ...options,
  });
  return socket;
};

export abstract class WithSocketIo implements WithAdapter<Socket> {
  constructor(public adapter: Socket) {}

  protected awaitForEvent<T>(event: string): Promise<T> {
    return new Promise((resolve) => {
      this.adapter.once(event, (data: T) => {
        resolve(data);
      });
    });
  }
}
