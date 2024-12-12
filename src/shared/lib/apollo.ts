/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApolloClient,
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { apolloConfig } from "@config/apollo.conf";
import { WithAdapter } from "@shared/types";

export const createApollo = (
  url: string,
  options?: ApolloClientOptions<NormalizedCacheObject>
) => {
  const client = new ApolloClient({
    uri: url,
    ...apolloConfig,
    ...options,
  });
  return client;
};

export abstract class WithApollo implements WithAdapter<ApolloClient<NormalizedCacheObject>> {
  constructor(public adapter: ApolloClient<NormalizedCacheObject>) {}
}
