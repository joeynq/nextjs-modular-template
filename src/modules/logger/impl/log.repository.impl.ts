import { Creation, WithAdapter } from "@shared/types";
import { LogMessage } from "../domain/log-message.entity";
import { LogRepository } from "../domain/log.repository";
import { logStorage } from "../store/log.storage";
import { LogFilterDto } from "../domain/log-filter.dto";

export class ConsoleLogRepositoryImpl
  implements WithAdapter<Console>, LogRepository
{
  adapter = console;

  async log<T>(log: Creation<LogMessage<T>>): Promise<void> {
    this.adapter.log(log);
  }

  async getLogs(): Promise<LogMessage<unknown>[]> {
    this.adapter.warn("ConsoleLogRepositoryImpl.getLogs() is not implemented");
    return [];
  }
}

export class LocalStorageLogRepository implements LogRepository {
  async log<T>(log: Creation<LogMessage<T>>): Promise<void> {
    const id = logStorage.count();
    logStorage.add({ ...log, id: id.toString() });
  }

  async getLogs(filter?: LogFilterDto): Promise<LogMessage<unknown>[]> {
    const logs = logStorage.get((item) => {
      if (!filter) {
        return true;
      }

      if (
        (filter.level && item.level !== filter.level) ||
        (filter.context && item.context !== filter.context)
      ) {
        return false;
      }

      if (filter.from && item.timestamp < filter.from) {
        return false;
      }

      if (filter.to && item.timestamp > filter.to) {
        return false;
      }

      return true;
    });

    if (!filter) {
      return logs;
    }

    return filter.limit ? logs.slice(0, filter.limit) : logs;
  }
}
