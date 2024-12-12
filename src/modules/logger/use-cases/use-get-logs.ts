import { useQuery } from "@tanstack/react-query";
import { LogFilterDto } from "../domain/log-filter.dto";
import { useLogService } from "../hooks/use-log-service";

export const useGetLogs = (filter?: LogFilterDto) => {
  const logger = useLogService();

  const result = useQuery({
    queryKey: ["logs", filter],
    queryFn: async () => {
      return logger.getLogs(filter);
    },
  });

  return result;
};
