import {
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export const apolloConfig: ApolloClientOptions<NormalizedCacheObject> = {
  cache: new InMemoryCache(),
};
