// @flow
import React, { memo } from 'react';

import Typography from '../Typography';
import useTheme from '../useTheme';

type Props = {|
  day: string,
|};

const DayHeader = ({ day }: Props) => {
  const theme = useTheme();

  const style = {
    width: '32px',
    height: '32px',
    textAlign: 'center',
    lineHeight: '32px',
    userSelect: 'none',
    color: theme.colors.guiding(),
  };

  return (
    <Typography
      type="smallButton"
      style={style}
    >
      {day}
    </Typography>
  );
};

export default (memo<Props>(DayHeader): React$AbstractComponent<Props, mixed>);
