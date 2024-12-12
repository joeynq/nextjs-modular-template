import { WithAdapter } from "@shared/types";
import { AxiosInstance } from "axios";

export abstract class WithGaxios implements WithAdapter<AxiosInstance> {
  constructor(public adapter: AxiosInstance) {}
}
