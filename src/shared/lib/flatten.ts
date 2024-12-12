/* eslint-disable @typescript-eslint/no-explicit-any */
export const removeIfEmpty = <R extends Record<string, any>>(
  obj: Record<string, unknown>,
  emptyValues = [null, undefined]
): R => {
  const result = {} as R;
  for (const key in obj) {
    const value = obj[key];
    if (!emptyValues.includes(value as any)) {
      if (typeof value === "object") {
        // @ts-expect-error - we know this is a leaf node
        result[key] = removeIfEmpty(value);
      } else {
        // @ts-expect-error - we know this is a leaf node
        result[key] = value;
      }
    }
  }

  return result;
};

export const unflatten = <R extends Record<string, any>>(
  obj: Record<string, unknown>
): R => {
  const result = {} as R;
  for (const key in obj) {
    const value = obj[key];
    const keys = key.split(".");
    let current = result;
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        // @ts-expect-error - we know this is a leaf node
        current[k] = value;
      } else {
        // @ts-expect-error - we know this is a leaf node
        current[k] = current[k] || {};
        // @ts-expect-error - we know this is a leaf node
        current = current[k] as Record<string, unknown>;
      }
    }
  }

  return result;
};

export const flatten = <R extends Record<string, any>>(
  obj: Record<string, unknown>
): R => {
  const flatParams = {} as any;
  const flatten = <R extends Record<string, any>>(
    obj: Record<string, unknown>,
    prefix = ""
  ): R => {
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        // @ts-expect-error - we know this is a leaf node
        flatten(value, newKey);
      } else {
        flatParams[newKey] = value as string;
      }
    }

    return flatParams as R;
  };

  return flatten(obj);
};
