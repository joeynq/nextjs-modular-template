"use client";

import { Progress } from "@shared/components/ui";
import { useSubscribeEvent } from "@shared/hooks";
import { useMemo, useState } from "react";

type TodoSummary = {
  total: number;
  completed: number;
};

export const Summary = () => {
  const [summary, setSummary] = useState<TodoSummary | null>(null);

  useSubscribeEvent("todo-fetched", (data) => {
    setSummary(data);
  });

  const percentage = useMemo(() => {
    if (!summary?.total) {
      return 0;
    }
    return (summary.completed * 100) / summary.total;
  }, [summary]);

  return (
    <div className="flex gap-4 items-center">
      <div className="gap-2 text-xs flex flex-wrap justify-between grow">
        <div>Your progress</div>
        <div>
          {summary?.completed}/{summary?.total} completed
        </div>
        <div className="w-full">
          <Progress value={percentage} />
        </div>
      </div>
    </div>
  );
};
