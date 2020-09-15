# NAXA Chart Components

This Storybook is hosted [here](https://naxa-developers.github.io/naxa-chart-components/)
Know about Storybook [here](https://storybook.js.org/)

⚠⚠⚠

This document is work under progress.

TODO:

- Add more and better examples and relevant links.

⚠⚠⚠

A collection of chart components to be used in the future projects of NAXA.

## Standarization Rules

For the sake of uniformity and clarity of the chart components this document serves as the guideline.

### Knobs

- Data Knob : This knob will have the data reduired for the chart and will update accordingly as value from there is changed.

Example:

```js
storiesOf("BarChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => <BarChart data={object("Data", data, "Data Knob")} />);
```

Note: Data Knob should be used in all components. If the case is such that it is not applicable or suitable for including the data knob then it should be mentioned in the chart docs.

- Color Knobs

Knob for colors of chart or its parts. These must be a color picker knob.

Example:

```js
storiesOf("BarChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <BarChart barColor={color("Bar Color", "#ff0000", "Color Knob")} />
  ));
```

- Numeric Knobs

These Knobs are of type numbers and can change warious values like:

    - Height/width of chart
    - Size/radius of chart/part of charts
    - Opacity of chart/part of charts
    - Font size

Note: Use of slider in this type of knob is preferred whenever applicable.

- Boolean knobs

These knobs are used to turn on and off features in the chart itself. However use of actions in preferred over boolean knobs if applicable and if the change is significant.

- Select (Options) knobs

These knobs are to be used when one of many options are to be selected. Like chart orientation (Horizontal/Vertical).

## Doccummentation of chart components
