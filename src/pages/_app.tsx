/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@assets/global.css";
import { useEventBus } from "@shared/hooks";
import { CoreProvider } from "@shared/store";
import {
  DefaultOptions,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode, useState } from "react";
import { toast } from "sonner";
import { initMocks } from "../mocks";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const errorHandler = (error: Error) => {
  toast.error(error.message);
};

const queryOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryOptions,
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);

  const { isReady } = useEventBus();

  const [isMockEnabled] = useState(() => {
    initMocks();
    return true;
  });

  return isReady && isMockEnabled ? (
    <QueryClientProvider client={queryClient}>
      <CoreProvider defaultErrorHandler={errorHandler}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </HydrationBoundary>
        <ReactQueryDevtools />
      </CoreProvider>
    </QueryClientProvider>
  ) : null;
}
