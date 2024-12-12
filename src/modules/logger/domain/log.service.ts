import { LogLevel } from "../interfaces/log-level";
import { LogFilterDto } from "./log-filter.dto";
import { LogRepository } from "./log.repository";

export class LogService {
  private context?: string;
  constructor(private readonly logRepository: LogRepository) {}

  setContext(context?: string) {
    this.context = context;
  }

  async getLogs(filter?: LogFilterDto) {
    return this.logRepository.getLogs(filter);
  }

  async log<T>(level: LogLevel, message: string, data?: T) {
    await this.logRepository.log({
      message,
      level,
      context: this.context,
      timestamp: new Date(),
      data,
    });
  }

  async info<T>(message: string, data?: T) {
    await this.log("info", message, data);
  }

  async warn<T>(message: string, data?: T) {
    await this.log("warn", message, data);
  }

  async error<T>(message: string, data?: T) {
    await this.log("error", message, data);
  }
}
