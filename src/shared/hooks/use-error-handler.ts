import { coreContext } from "@shared/context";
import { PromiseFunction } from "@shared/types";
import { useContext } from "react";

export type ErrorHandler = <Err extends Error>(error: Err) => void;

export const useErrorHandler = <T extends PromiseFunction>(
  promiseFn: T,
  onError?: ErrorHandler
): T => {
  const defaultErrorHandler = useContext(coreContext).defaultErrorHandler;
  const errorHandler = onError || defaultErrorHandler;
  return (async (...args: Parameters<T>) => {
    try {
      return promiseFn(...args);
    } catch (error) {
      errorHandler(error as Error);
    }
  }) as T;
};
