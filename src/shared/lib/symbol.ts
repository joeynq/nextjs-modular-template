export const symbolToString = (symbol: symbol | string): string => {
  if (typeof symbol === "string") {
    return symbol;
  }
  return symbol.description || symbol.toString();
};
