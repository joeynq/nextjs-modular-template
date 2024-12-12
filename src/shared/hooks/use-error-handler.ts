import { coreContext } from "@shared/store";
import { PromiseFunction } from "@shared/types";
import { useContext } from "react";

export type ErrorHandler = <Err extends Error>(error: Err) => void;

/**
 * A hook that wraps a promise function and handles its errors.
 * @param promiseFn {PromiseFunction} The promise function to wrap.
 * @param onError {ErrorHandler} The error handler function.
 * @returns {PromiseFunction} The wrapped promise function, which will handle errors.
 * @example
    const fetchUser = useErrorHandler(async (id: string) => {
      const response = await fetch(`/api/users/${id}`);
      return response.json();
    }, (error) => {
      toast.error(error.message);
    });
    
    const user = await fetchUser("1"); // If an error occurs, a toast message will be shown.
 */
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
