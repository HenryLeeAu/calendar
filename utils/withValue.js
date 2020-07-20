// @flow
export default (array: Array<number>, value?: Date): Array<number> => {
  if (value && value.getFullYear() < array[0]) {
    return [value.getFullYear(), ...array];
  }

  if (value && value.getFullYear() > array[array.length - 1]) {
    return [...array, value.getFullYear()];
  }

  return array;
};
