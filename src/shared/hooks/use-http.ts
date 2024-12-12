import { coreContext } from "@shared/context";
import { useContext } from "react";

export const useHttp = () => {
  return useContext(coreContext).http;
};
