import { CreateAxiosDefaults } from "axios";

export const axiosConfig: CreateAxiosDefaults = {
  headers: {
    "Content-Type": "application/json",
  },
  adapter: "fetch",
};
