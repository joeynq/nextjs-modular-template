import { formatDistanceToNow } from "date-fns";
import { forwardRef } from "react";

// forwardRef to HTMLTimeElement
export interface RelativeTimeProps
  extends React.HTMLAttributes<HTMLTimeElement> {
  dateTime: Date | string | number;
}
export const RelativeTime = forwardRef<HTMLTimeElement, RelativeTimeProps>(
  ({ dateTime, children, ...props }, ref) => {
    const date = dateTime instanceof Date ? dateTime : new Date(dateTime);
    const content = children ?? formatDistanceToNow(date, { addSuffix: true });
    return (
      <time ref={ref} dateTime={date.toISOString()} {...props}>
        {content}
      </time>
    );
  }
);

RelativeTime.displayName = "RelativeTime";
