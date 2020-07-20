// @flow
import React from 'react';
import type { Node } from 'react';

import useTheme from '../../useTheme';
import Box from '../../Box';
import DateButton from './DateButton';

import formatTimeString from '../utils/formatTimeString';

type DateObjProps = {|
  year: number,
  month: number,
  date: number,
|};

type Props = {|
  weekArray: Array<DateObjProps>,
  getDateStatus: (dateObj: DateObjProps) => string,
  changeDate: (
    event: SyntheticEvent<HTMLButtonElement>,
    dateObj: DateObjProps,
  ) => void,
  dateButtonProps?: (dateValue: Date) => ({ ... }),
|};

const WeekRow = ({
  weekArray,
  changeDate,
  getDateStatus,
  dateButtonProps = () => ({}),
}: Props): Node => {
  const theme = useTheme();

  const style = {
    textAlign: 'center',
    padding: `${theme.spacing(1)}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Box
      style={style}
      data-testid="tabx-calendar-week-row"
    >
      {weekArray.map((dateObj) => (
        <DateButton
          key={dateObj.date}
          date={dateObj.date}
          dateStatus={getDateStatus(dateObj)}
          onClick={(e) => changeDate(e, dateObj)}
          buttonObj={dateButtonProps(
            new Date(formatTimeString(dateObj.year, dateObj.month, dateObj.date)),
          )}
        />
      ))}
    </Box>
  );
};

export default WeekRow;
