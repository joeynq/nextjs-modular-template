import axios from "axios";

export const createAxios = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    adapter: "fetch",
  });

  return axiosInstance;
};
