import { createContext, PropsWithChildren } from "react";

export interface CoreContext {
  defaultErrorHandler: (error: Error) => void;
  // user: User; // authenticated user
}

export const coreContext = createContext<CoreContext>({
  defaultErrorHandler: (error) => {
    console.error(error);
  },
});

export interface CoreProviderProps {
  defaultErrorHandler?: (error: Error) => void;
}

export const CoreProvider = ({
  defaultErrorHandler,
  children,
}: PropsWithChildren<CoreProviderProps>) => {
  return (
    <coreContext.Provider
      value={{
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
