# NAXA Chart Components

A collection of chart components to be used in the future projects of NAXA.

## Standarization Rules

For the sake of uniformity and clarity of the chart components this document serves as the guideline.

### Required Knobs

For every chart components following knobs are compulsory to be in there:

- Data Knob : This knob will have the data reduired for the chart and will update accordingly as value from there is changed.

Example:

```js
storiesOf("BarChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => <BarChart data={object("Data", data, "Data Knob")} />);
```

### Optional Knobs

These Knobs are optional to have in a component.
