/* eslint-disable @typescript-eslint/no-explicit-any */
import { flatten, removeIfEmpty, unflatten } from "@shared/lib/flatten";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

type Primitive = string | number | boolean | null | undefined;

export type StringValues<T> = {
  [K in keyof T]: T[K] extends Primitive | Array<Primitive>
    ? string
    : StringValues<T[K]>;
};

export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Primitive | Array<Primitive>
    ? T[K]
    : NestedPartial<T[K]>;
};

/**
 * Hook to get query params from the URL. supports nested objects
 * @returns {StringValues<T>} - Object with query params
 * @example
  const [params, setParams] = useQueryParams<{ foo: string; bar: { baz: string } }>();
  console.log(params.foo); // string
  console.log(params.bar.baz); // string
  console.log(params.bar); // { baz: string } 
  setParams({ foo: "new value" });
  setParams({ bar: { baz: "new value" } });
 */
export const useQueryParams = <T>(): [
  StringValues<T>,
  (newParams: NestedPartial<T>) => void
] => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => {
    if (typeof window === "undefined") {
      return {} as StringValues<T>;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const params = {} as Record<string, string>;
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return unflatten(params) as StringValues<T>;
  }, []);

  const setParams = (newParams: NestedPartial<T>) => {
    const newFlatParams = removeIfEmpty(flatten(newParams));

    const searchParams = new URLSearchParams();
    for (const key in newFlatParams) {
      const value = newFlatParams[key];
      searchParams.set(key, value);
    }

    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return [params, setParams] as const;
};
