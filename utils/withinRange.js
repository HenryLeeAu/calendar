// @flow
import formatTimeString from './formatTimeString';

type targetTimeObject = {|
  date: number,
  month: number,
  year: number,
|};

export default (
  {
    date, month, year,
  }: targetTimeObject,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  const targetTime = new Date(formatTimeString(year, month, date)).getTime();

  const greaterThan = (time, comparsion) => (
    !comparsion || time >= new Date(comparsion).getTime()
  );

  const lessThan = (time, comparsion) => (
    !comparsion || time <= new Date(comparsion).getTime()
  );

  return greaterThan(targetTime, minDate) && lessThan(targetTime, maxDate);
};
