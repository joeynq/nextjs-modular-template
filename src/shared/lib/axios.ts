/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosConfig } from "@config/axios.conf";
import { WithAdapter } from "@shared/types";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export const createAxios = (baseURL: string, options?: CreateAxiosDefaults) => {
  const axiosInstance = axios.create({
    baseURL,
    ...axiosConfig,
    ...options,
  });

  return axiosInstance;
};

export abstract class WithAxios implements WithAdapter<AxiosInstance> {
  constructor(public adapter: AxiosInstance) {}

  protected get<T = any, D = any>(
    url: string,
    config?: axios.AxiosRequestConfig<D>
  ): Promise<T> {
    return this.returnData(this.adapter.get(url, config));
  }

  protected delete<T = any, D = any>(
    url: string,
    config?: axios.AxiosRequestConfig<D>
  ): Promise<T> {
    return this.returnData(this.adapter.delete(url, config));
  }

  protected post<T = any, D = any>(
    url: string,
    data?: D,
    config?: axios.AxiosRequestConfig<D>
  ): Promise<T> {
    return this.returnData(this.adapter.post(url, data, config));
  }

  protected put<T = any, D = any>(
    url: string,
    data?: D,
    config?: axios.AxiosRequestConfig<D>
  ): Promise<T> {
    return this.returnData(this.adapter.put(url, data, config));
  }

  protected patch<T = any, D = any>(
    url: string,
    data?: D,
    config?: axios.AxiosRequestConfig<D>
  ): Promise<T> {
    return this.returnData(this.adapter.patch(url, data, config));
  }

  protected async returnData<T>(
    response: Promise<axios.AxiosResponse<T>>
  ): Promise<T> {
    const res = await response;
    return res.data;
  }
}
