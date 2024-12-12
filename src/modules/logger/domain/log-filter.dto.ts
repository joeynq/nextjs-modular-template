export interface LogFilterDto {
  level?: string;
  context?: string;
  from?: Date;
  to?: Date;
  limit?: number;
}
