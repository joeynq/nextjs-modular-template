import { useCustomMutation } from "@shared/hooks";
import { useEffect, useState } from "react";
import { LogMessage } from "../domain/log-message.entity";
import { useLogService } from "../hooks/use-log-service";

export const useLogger = (context?: string) => {
  const logService = useLogService(context);

  const [logs, setLogs] = useState<LogMessage<unknown>[] | undefined>();

  useEffect(() => {
    if (!logs) {
      logService.getLogs().then(setLogs);
    }
  }, [logService, logs]);

  return {
    info: useCustomMutation(logService.info.bind(logService), {
      queryKey: ["logs"],
    }),
    warn: useCustomMutation(logService.warn.bind(logService), {
      queryKey: ["logs"],
    }),
    error: useCustomMutation(logService.error.bind(logService), {
      queryKey: ["logs"],
    }),
  };
};
