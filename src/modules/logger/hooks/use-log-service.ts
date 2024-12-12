import { LogService } from "../domain/log.service";
import { LocalStorageLogRepository } from "../impl/log.repository.impl";

export const useLogService = (context?: string) => {
  const logger = new LogService(new LocalStorageLogRepository());
  logger.setContext(context);

  return logger;
};
