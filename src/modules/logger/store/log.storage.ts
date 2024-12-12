import { ListLocalStorage } from "@shared/lib/local-storage";
import { LogMessage } from "../domain/log-message.entity";

export const logStorage = new ListLocalStorage<LogMessage<unknown>>("logs");
