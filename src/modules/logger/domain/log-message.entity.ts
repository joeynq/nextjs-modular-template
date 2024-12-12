import { LogLevel } from "../interfaces/log-level";

export interface LogMessage<T> {
  id: string;
  message: string;
  level: LogLevel;
  context?: string;
  timestamp: Date;
  data?: T;
}
