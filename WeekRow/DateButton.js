// @flow
import React from 'react';
import type { Node } from 'react';

import useTheme from '../../useTheme';
import BaseButton from '../../BaseButton';
import Typography from '../../Typography';
import hexToRgba from '../../internal/hexToRgba';

import { dateStatusString } from '../constants';

type Props = {|
  dateStatus: string,
  date: number,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  buttonObj: { ... },
|};

const DateButton = ({
  dateStatus,
  date,
  onClick,
  buttonObj,
}: Props): Node => {
  const theme = useTheme();

  const {
    notCurrentMonth,
    selected,
    beyondRange,
    normal,
  } = dateStatusString;

  const matchStyle = (obj) => obj[dateStatus];

  const styles = {
    buttonWrapper: {
      width: '32px',
      height: '32px',
      textAlign: 'center',
      lineHeight: '32px',
      userSelect: 'none',
      ...matchStyle({
        [beyondRange]: {
          color: hexToRgba(theme.colors.inform(), 0.2),
        },
        [normal]: {
          color: theme.colors.inform(),
          ':hover': {
            background: theme.colors.foundation(),
          },
        },
        [notCurrentMonth]: {
          color: theme.colors.guiding(),
          ':hover': {
            background: theme.colors.foundation(),
            color: theme.colors.inform(),
          },
        },
        [selected]: {
          background: theme.colors.genuine(),
          color: theme.colors.pure(),
        },
      }),
    },
    button: {
      fontSize: 'inherit',
      width: '100%',
      height: '100%',
      display: 'block',
      lineHeight: '32px',
      fontWeight: theme.fonts.body.style,
    },
  };

  return (
    <Typography
      type="body"
      style={styles.buttonWrapper}
    >
      <BaseButton
        {...buttonObj}
        disabled={dateStatus === beyondRange}
        data-testid="tabx-calendar-date"
        onClick={(e) => {
          onClick(e);
        }}
        style={styles.button}
      >
        {date}
      </BaseButton>
    </Typography>
  );
};

export default DateButton;
