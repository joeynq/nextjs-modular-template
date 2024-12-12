/* eslint-disable @typescript-eslint/no-empty-object-type */
import "@assets/global.css";
import "../mocks";
import { CoreProvider } from "@shared/context";
import { createAxios } from "@shared/helpers";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { apiEndpoint } from "../config/api";
import { toast } from "sonner";

const http = createAxios(apiEndpoint);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const errorHandler = (error: Error) => {
  toast.error(error.message);
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <CoreProvider http={http} defaultErrorHandler={errorHandler}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </HydrationBoundary>
        <ReactQueryDevtools />
      </CoreProvider>
    </QueryClientProvider>
  );
}
