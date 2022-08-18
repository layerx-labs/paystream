/**
 * function to increment a date by a given number of milliseconds
 * @param date
 * @param milliseconds
 * @returns
 */
export const addMilliseconds = (date: Date, milliseconds: number) => {
  return new Date(date.getTime() + milliseconds);
};
