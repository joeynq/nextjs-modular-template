import { Creation } from "@shared/types";
import { LogMessage } from "./log-message.entity";
import { LogFilterDto } from "./log-filter.dto";

export interface LogRepository {
  log<T>(log: Creation<LogMessage<T>>): Promise<void>;
  getLogs(filter?: LogFilterDto): Promise<LogMessage<unknown>[]>;
}
