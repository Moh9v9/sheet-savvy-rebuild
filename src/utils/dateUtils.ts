
import { format, isValid, parseISO } from "date-fns";

export const safeFormatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, "MMM d, yyyy") : "Invalid date";
  } catch (error) {
    return "Invalid date";
  }
};
