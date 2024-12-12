import { useEffect } from "react";

export const useLocalStorage = <T>(
  key: string,
  callback: (value: T) => void
) => {
  useEffect(() => {
    const cb = (event: StorageEvent) => {
      if (event.key === key) {
        callback(JSON.parse(event.newValue!));
      }
    };

    window.addEventListener("storage", cb);
    return () => {
      window.removeEventListener("storage", cb);
    };
  }, [callback, key]);
};
