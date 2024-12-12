import { AllEvents } from "@shared/events";
import { offEvent, onEvent, StringKeyOf } from "@shared/lib/event-bus";
import { useEffect } from "react";

interface Options {
  activeOnly?: boolean;
  once?: boolean;
}

export function useSubscribeEvent<K extends StringKeyOf<AllEvents>>(
  eventName: K,
  callback: (payload: AllEvents[K]) => void,
  options?: Options
) {
  useEffect(() => {
    onEvent(eventName, callback, options);

    // Cleanup subscription on unmount
    return () => {
      offEvent(eventName, callback);
    };
  }, [callback, eventName, options]);
}
