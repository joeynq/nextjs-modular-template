import { PromiseFunction } from "@shared/types";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "./use-error-handler";

export interface CustomMutationOptions {
  queryKey?: string[];
  onError?: (error: Error) => void;
}

export const useCustomMutation = <T extends PromiseFunction>(
  promiseFn: T,
  options?: CustomMutationOptions
): T => {
  const queryClient = useQueryClient();

  return useErrorHandler(
    (async (...args: Parameters<T>) => {
      const result = await promiseFn(...args);
      if (options?.queryKey) {
        queryClient.invalidateQueries({ queryKey: options.queryKey });
      }
      return result;
    }) as T,
    options?.onError
  );
};
