import { ScrollArea } from "@shared/components/ui";
import { useSubscribeEvent } from "@shared/hooks";
import { useGetLogs } from "../use-cases/use-get-logs";
import { useLogger } from "../use-cases/use-logger";
import { LogLine } from "./log-line";

export const Logs = () => {
  const { data } = useGetLogs();
  const logger = useLogger();

  useSubscribeEvent(
    "todo-created",
    (data) => {
      logger.info(`Todo created`, data);
    },
    { once: true }
  );

  return (
    <ScrollArea className="grow">
      <ul className="space-y-2">
        {data?.map((log) => (
          <LogLine key={log.id} log={log} />
        ))}
      </ul>
    </ScrollArea>
  );
};
