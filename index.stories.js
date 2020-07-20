// @flow
import * as React from 'react';

import ApiTable from '../internal/ApiTable';
import CodeSnippet from '../internal/CodeSnippet';

import Calendar from '.';

import getTime from '../internal/getTime';

import {
  Panel,
  Paragraph,
  Input,
  Divider,
  Dropdown,
  Anchor,
} from '..';

type Props = {|
  maxDate?: Date,
  minDate?: Date,
  alwaysOpen?: boolean,
  defaultValue?: Date,
|};

const WithInput = ({
  minDate,
  maxDate,
  alwaysOpen,
  defaultValue = null,
}: Props) => {
  const [value, setValue] = React.useState(defaultValue);
  const [open, setOpen] = React.useState(alwaysOpen || false);

  return (
    <>
      <Input
        readOnly
        value={value || ''}
        onClick={() => {
          if (!alwaysOpen) setOpen((prev) => !prev);
        }}
        style={{ margin: 0 }}
      />
      {
        open && (
          <Calendar
            onChange={(e, { newValue }) => {
              setValue(newValue);
              if (!alwaysOpen) {
                setOpen(false);
              }
            }}
            value={value}
            minDate={minDate}
            maxDate={maxDate}
            style={{
              width: '320px',
            }}
          />
        )
      }
    </>
  );
};

export default {
  title: 'Calendar',
  component: Calendar,
};

export const ComponentExample = (): React.Node => (
  <>
    <Panel>
      <Paragraph>
        {'Click input to open calendar'}
      </Paragraph>
      <WithInput />
      <CodeSnippet>
        {`
const [value, setValue] = useState();
const [open, setOpen] = useState(alwaysOpen || false);

return (
  <>
    <Input
      readOnly
      value={value || ''}
      onClick={() => {
        if (!alwaysOpen) setOpen((prev) => !prev);
      }}
      style={{ margin: 0 }}
    />
    {
      open && (
        <Calendar
          onChange={(e, { newValue }) => {
            setValue(newValue);
            if (!alwaysOpen) {
              setOpen(false);
            }
          }}
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          style={{
            width: '320px',
          }}
        />
      )
    }
  </>
);
        `}
      </CodeSnippet>
    </Panel>
    <ApiTable
      name="Calendar"
    />
  </>
);

export const WithDropdown = (): React.Node => {
  const WithDropdownComp = () => {
    const [value, setValue] = React.useState();
    return (
      <>
        selected time :
        {value && `${getTime(value).year}/${getTime(value).month}/${getTime(value).date}`}
        <Dropdown
          sheet={({ onClose }) => (
            <Calendar
              onChange={(e, { newValue }) => {
                onClose();
                setValue(newValue);
              }}
              value={value}
              dateButtonProps={(dateValue) => ({
                as: Anchor,
                href: `link${getTime(dateValue).year}/${getTime(dateValue).month}/${getTime(dateValue).date}`,
                target: '_blank',
              })}
              minDate={new Date('2020-04-02')}
            />
          )}
        >
          Dropdown button
        </Dropdown>
      </>
    );
  };

  return (
    <Panel style={{
      position: 'relative',
    }}
    >
      <WithDropdownComp />
      <CodeSnippet>
        {`
const [value, setValue] = useState();
return (
  <>
    <Dropdown
      style={{
      }}
      sheet={({ onClose }) => (
        <Calendar
          onChange={(e, {newValue}) => {
            onClose();
            setValue(newValue);
          }}
          value={value}
          dateButtonProps={(dateValue) => ({
            as: Anchor,
            href: 'your-url-with-dateValue',
            target: '_blank',
          })}
        />
      )}
    >
      Dropdown button
    </Dropdown>
  </>
);
`}
      </CodeSnippet>
    </Panel>
  );
};

export const WithSelectableRange = (): React.Node => (
  <Panel>
    <Paragraph>
      {'default selectable range is between this year and last year'}
    </Paragraph>
    <WithInput />
    <Divider />
    <Paragraph>
      {'specify minDate and maxDate'}
    </Paragraph>
    <WithInput
      minDate={new Date('2022-10-10')}
      maxDate={new Date('2025-01-10')}

    />
    <CodeSnippet>

      {`
<Calendar
  minDate={new Date('2022-10-10')}
  maxDate={new Date('2025-01-10')}
/>
`}
    </CodeSnippet>
    <Divider />
    <Paragraph>
      {'only specify minDate, the range between this year and next year'}
    </Paragraph>
    <WithInput
      minDate={new Date('2022-10-10')}
    />
    <Divider />
    <Paragraph>
      {'only specify maxDate, the range between this year and last year'}
    </Paragraph>
    <WithInput
      maxDate={new Date('2022-10-10')}
    />
    <Divider />
    <Paragraph>
      {'when default value beyond range, user are able to see the disabled month by default but cannot change back'}
    </Paragraph>
    <WithInput
      defaultValue={new Date('2030-10-10')}
      maxDate={new Date('2022-10-10')}
    />
    <WithInput
      defaultValue={new Date('2010-10-10')}
      minDate={new Date('2022-10-10')}
    />
  </Panel>
);

export const WithoutClosingCalendar = (): React.Node => (
  <Panel>
    <WithInput
      alwaysOpen
    />
  </Panel>
);
