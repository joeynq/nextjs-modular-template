import { format } from "date-fns";
import { forwardRef } from "react";

export interface TimeOnlyProps extends React.HTMLAttributes<HTMLTimeElement> {
  dateTime: Date | string | number;
}
export const TimeOnly = forwardRef<HTMLTimeElement, TimeOnlyProps>(
  ({ dateTime, children, ...props }, ref) => {
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime);
    const content = children ?? format(date, "HH:mm:ss");
    return (
      <time ref={ref} dateTime={date.toISOString()} {...props}>
        {content}
      </time>
    );
  }
);

TimeOnly.displayName = "TimeOnly";
