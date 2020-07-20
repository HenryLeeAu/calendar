// @flow
type Value = number | string;

export default (
  year: Value,
  month: Value,
  date: Value,
): string => {
  const format = (number) => (Number(number) < 10 ? `0${number}` : number);

  return `${year}-${format(month)}-${format(date)}`;
};
