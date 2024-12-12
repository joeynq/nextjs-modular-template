import axios, { AxiosInstance } from "axios";
import { createContext, PropsWithChildren } from "react";

export interface CoreContext {
  http: AxiosInstance;
  defaultErrorHandler: (error: Error) => void;
  // user: User; // authenticated user
}

export const coreContext = createContext<CoreContext>({
  http: axios,
  defaultErrorHandler: (error) => {
    console.error(error);
  },
});

export interface CoreProviderProps {
  http: AxiosInstance;
  defaultErrorHandler?: (error: Error) => void;
}

export const CoreProvider = ({
  http,
  defaultErrorHandler,
  children,
}: PropsWithChildren<CoreProviderProps>) => {
  return (
    <coreContext.Provider
      value={{
        http,
        defaultErrorHandler:
          defaultErrorHandler ??
          ((error) => {
            console.error(error);
          }),
      }}
    >
      {children}
    </coreContext.Provider>
  );
};
