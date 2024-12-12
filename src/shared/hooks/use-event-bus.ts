import { initEventBus } from "@shared/lib/event-bus";
import { useEffect, useState } from "react";

export const useEventBus = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    initEventBus("global");
    setIsReady(true);
  }, [isReady]);

  return { isReady };
};
