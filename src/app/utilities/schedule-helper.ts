import { getYear, getMonth, getDate, addMinutes, differenceInMinutes } from 'date-fns';

const now = new Date();
const workDayStart = new Date(getYear(now), getMonth(now), getDate(now), 8, 0, 0);
const workdayLength = 600;
const workdayEnd = addMinutes(workDayStart, workdayLength);
const circleRadius = 5;

/**
 * Calculates the now line top value in pixels based on the current time.
 * This accounts for the circle radius.
 * @param date The date to calculate the top value for.
 * @returns The top value in pixels.
 */
export function calculateNowLineTopValue(date: Date, zoom: number): number {
  return (differenceInMinutes(date, workDayStart) - circleRadius) * zoom;
}

/**
 *  Calculates the top value in pixels based on the date and zoom level.
 * @param date The date to calculate the top value for.
 * @param zoom The current zoom level.
 * @returns The top value in pixels.
 */
export function calculateTopValue(date: Date, zoom: number): number {
  return differenceInMinutes(date, workDayStart) * zoom;
}

export function calculateHeightValue(start: Date, end: Date, zoom: number): number {
  const startTime = start < workDayStart ? workDayStart : start;
  const endTime = end > workdayEnd ? workdayEnd : end;
  return differenceInMinutes(end, start) * zoom;
}
