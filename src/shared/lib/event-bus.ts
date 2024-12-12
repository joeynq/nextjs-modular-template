import { AllEvents } from "@shared/events";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventHandler<T = any> = (payload: T) => void;

export type StringKeyOf<T> = Extract<keyof T, string>;

type HandlerOptions = {
  activeOnly?: boolean;
  once?: boolean;
};

let channel: BroadcastChannel | null = null;
let isActiveTab = false;
const listeners: Map<
  string,
  Set<{ handler: EventHandler; options?: HandlerOptions }>
> = new Map();

export const initEventBus = (channelName: string) => {
  channel = new BroadcastChannel(channelName);
  window.addEventListener("focus", () => (isActiveTab = true));
  window.addEventListener("blur", () => (isActiveTab = false));
  channel.onmessage = (event) => {
    const { eventName, payload } = event.data;
    notifyListeners(eventName, payload);
  };

  return () => {
    window.removeEventListener("focus", () => (isActiveTab = true));
    window.removeEventListener("blur", () => (isActiveTab = false));
    channel?.close();
  };
};

export const emitEvent = <K extends StringKeyOf<AllEvents>>(
  eventName: K,
  payload: AllEvents[K]
) => {
  if (channel) {
    channel.postMessage({ eventName, payload });
  }
};

export const onEvent = <K extends StringKeyOf<AllEvents>>(
  eventName: K,
  callback: EventHandler<AllEvents[K]>,
  options: HandlerOptions = {}
) => {
  if (!listeners.has(eventName)) {
    listeners.set(eventName, new Set());
  }
  const listenerSet = listeners.get(eventName)!;

  // if the listener is already registered, remove it first
  offEvent(eventName, callback);

  listenerSet.add({ handler: callback, options });
};

export const onceEvent = <K extends StringKeyOf<AllEvents>>(
  eventName: K,
  callback: EventHandler<AllEvents[K]>
) => {
  const onceWrapper = (payload: AllEvents[K]) => {
    callback(payload);
    offEvent(eventName, onceWrapper);
  };
  onEvent(eventName, onceWrapper, { activeOnly: true, once: true });
};

export const offEvent = <K extends StringKeyOf<AllEvents>>(
  eventName: K,
  callback: EventHandler<AllEvents[K]>
) => {
  const listenerSet = listeners.get(eventName);
  if (listenerSet) {
    listenerSet.forEach((listener) => {
      if (listener.handler === callback) {
        listenerSet.delete(listener);
      }
    });
  }
};

const notifyListeners = <K extends StringKeyOf<AllEvents>>(
  eventName: K,
  payload: AllEvents[K]
) => {
  const listenerSet = listeners.get(eventName);
  if (listenerSet) {
    listenerSet.forEach(({ handler, options }) => {
      if (options?.activeOnly && !isActiveTab) {
        return;
      }
      handler(payload);
    });
  }
};
