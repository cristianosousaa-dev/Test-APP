import { TZDate } from "@date-fns/tz";
import { addDays, isWeekend } from "date-fns";

/**
 * Adds `n` business days (Mon–Fri) in `timezone`, keeping the local time of day.
 * Saturday 10:00 + 1 → Monday 10:00. DST changes keep wall-clock time.
 */
export function addBusinessDays(date: Date, n: number, timezone: string): Date {
  let cursor = new TZDate(date.getTime(), timezone);
  let added = 0;
  while (added < n) {
    cursor = addDays(cursor, 1);
    if (!isWeekend(cursor)) added += 1;
  }
  return new Date(cursor.getTime());
}
