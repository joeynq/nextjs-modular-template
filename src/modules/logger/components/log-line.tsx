/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeOnly } from "@shared/components/time";
import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shared/components/ui";
import { cn } from "@shared/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { PropsWithChildren } from "react";
import { LogMessage } from "../domain/log-message.entity";

export interface LogLineProps {
  log: LogMessage<any>;
}

export const LogLine = ({ log }: PropsWithChildren<LogLineProps>) => {
  return (
    <li>
      <Collapsible className="flex items-center space-x-2 flex-wrap w-full">
        <TimeOnly dateTime={log.timestamp} />
        <Badge
          className={cn(
            "uppercase text-xs",
            log.level === "error" && "bg-red-500 text-white",
            log.level === "warn" && "bg-yellow-500 text-white",
            log.level === "info" && "bg-blue-500 text-white"
          )}
        >
          {log.level}
        </Badge>
        <span className="grow">{log.message}</span>
        <CollapsibleTrigger asChild>
          <Button variant="secondary" size="icon">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 w-full">
          {log.data && (
            <pre className="bg-white p-2 rounded-md font-mono text-sm">
              {JSON.stringify(log.data, null, 2)}
            </pre>
          )}
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};
