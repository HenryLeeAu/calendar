// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styler from '../styler';
import Box from '../Box';
import useTheme from '../useTheme';

import DaysHeader from './DaysHeader';
import YearAndDateSection from './YearAndDateSection';
import WeekRow from './WeekRow';

import { daysArray, dateStatusString } from './constants';
import calendarArray from './utils/calendarArray';
import formatTimeString from './utils/formatTimeString';
import getTime from '../internal/getTime';
import getYearsArray from './utils/getYearsArray';
import withinRange from './utils/withinRange';

type Props = {
  dateButtonProps?: (dateValue: Date) => { ... },
  maxDate?: Date,
  minDate?: Date,
  onChange?: (
    event: SyntheticEvent<HTMLButtonElement>,
    {|
      newValue: Date,
      formatNewValue: string,
    |},
  ) => void,
  style?: Style,
  value?: Date,
  ...
};

const Calendar = React.forwardRef<Props, HTMLElement>(({
  dateButtonProps = () => ({}),
  minDate,
  maxDate,
  onChange,
  style = {},
  value,
  ...otherProps
}, ref) => {
  const yearsArray = getYearsArray(minDate, maxDate);

  const [currentYear, setCurrentYear] = useState(
    getTime(value).year
    || getTime(minDate).year
    || getTime(maxDate).year
    || new Date(Date.now()).getFullYear(),
  );

  const [currentMonth, setCurrentMonth] = useState(
    getTime(value).month
    || getTime(minDate).month
    || getTime(maxDate).month
    || new Date(Date.now()).getMonth() + 1,
  );

  const getDateStatus = (obj) => {
    const {
      notCurrentMonth, selected, beyondRange, normal,
    } = dateStatusString;

    if (obj.date === getTime(value).date
      && obj.month === getTime(value).month
      && obj.year === getTime(value).year) {
      return selected;
    }

    if (!withinRange(
      obj,
      minDate || new Date(yearsArray[0], 1, 0),
      maxDate || new Date(yearsArray[yearsArray.length - 1], 11, 31),
    )) {
      return beyondRange;
    }

    if (obj.month !== currentMonth) {
      return notCurrentMonth;
    }
    return normal;
  };

  const changeYear = (event) => {
    const updateDropdownTime = (year, month) => {
      if (maxDate
          && year >= maxDate.getFullYear()
          && month >= maxDate.getMonth() + 1) {
        return {
          year: maxDate.getFullYear(),
          month: maxDate.getMonth() + 1,
        };
      }
      if (minDate
          && year <= minDate.getFullYear()
          && month <= minDate.getMonth() + 1) {
        return {
          year: minDate.getFullYear(),
          month: minDate.getMonth() + 1,
        };
      }
      return {
        year, month,
      };
    };
    const { year, month } = updateDropdownTime(
      Number(event.currentTarget.value),
      Number(currentMonth),
    );

    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const changeMonth = (event) => {
    setCurrentMonth(Number(event.currentTarget.value));
  };

  const changeDate = (event, { year, month, date }) => {
    if (withinRange({ year, month, date }, minDate, maxDate)
      && onChange
    ) {
      const newValue = formatTimeString(year, month, date);

      onChange(
        event,
        {
          newValue: new Date(newValue),
          formatNewValue: newValue,
        },
      );
    }
  };

  const theme = useTheme();

  const styles = {
    container: styler(style, theme, {
      width: '320px',
      maxWidth: '100%',
      background: theme.colors.pure(),
    }),
    dayHeaderwrapper: {
      background: theme.colors.foundation(),
      textAlign: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(5)}px ${theme.spacing(2)}px ${theme.spacing(5)}px`,
      display: 'flex',
      justifyContent: 'space-between',
    },
    day: {
      display: 'inline-block',
      width: '14%',
      textAlign: 'center',
    },
    weekRowWrapper: {
      padding: `${theme.spacing(1)}px ${theme.spacing(5)}px ${theme.spacing(4)}px`,
    },
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <YearAndDateSection
        currentMonth={Number(currentMonth)}
        currentYear={Number(currentYear)}
        yearsArray={yearsArray}
        inputValue={value}
        minDate={minDate}
        maxDate={maxDate}
        changeMonth={changeMonth}
        changeYear={changeYear}
      />
      <Box style={styles.dayHeaderwrapper}>
        {daysArray.map((day) => (
          <DaysHeader
            key={day}
            day={day}
          />
        ))}
      </Box>
      <Box
        style={styles.weekRowWrapper}
      >
        {calendarArray(Number(currentYear), Number(currentMonth)).map((weekArray, index) => (
          <WeekRow
            key={`${index + weekArray[0].month + weekArray[0].year}`}
            changeDate={changeDate}
            getDateStatus={getDateStatus}
            weekArray={weekArray}
            dateButtonProps={dateButtonProps}
          />
        ))}
      </Box>
    </Box>
  );
});

Calendar.displayName = 'Calendar';

// $FlowExpectedError propTypes
Calendar.propTypes = {
  /**
   * accepts a function which is passed the date in Date object format
   * and expects an object to be returned which will be passed as props into each DateButton
  */
  dateButtonProps: PropTypes.func,
  /** specify maxmium selectable date with vaild Date object */
  maxDate: PropTypes.instanceOf(Date),
  /** specify minimum selectable date with vaild Date object */
  minDate: PropTypes.instanceOf(Date),
  /**
   * triggers when a date is selected.
   * (event, { newValue, formatNewValue }) => {}
   */
  onChange: PropTypes.func,
  /** specify selected date with vaild Date object */
  value: PropTypes.instanceOf(Date),
  /** overrides styling for root element */
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default (Calendar: React$AbstractComponent<Props, HTMLElement>);
