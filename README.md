# calendar

![Alt text](calendar-example.gif?raw=true "Title")

## Props

| Name            | Type            | Default value | Description                                                                                                                                               |
| --------------- | --------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dateButtonProps | func            | () => ({})    | accepts a function which is passed the date in Date object format and expects an object to be returned which will be passed as props into each DateButton |
| maxDate         | instanceOf Date |               | specify maxmium selectable date with vaild Date object                                                                                                    |
| minDate         | instanceOf Date |               | specify minimum selectable date with vaild Date object                                                                                                    |
| onChange        | func            |               | triggers when a date is selected. (event, { newValue, formatNewValue }) => {}                                                                             |
| value           | instanceOf Date |               | specify selected date with vaild Date object                                                                                                              |
| style           | object          |               | func                                                                                                                                                      | {} | overrides styling for root element |
