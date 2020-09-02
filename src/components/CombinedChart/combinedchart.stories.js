import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import CombinedChart from "./index.js";

const data = [
  { label: 10, lineValue: 52, barValue: 20 },
  { label: 20, lineValue: 12, barValue: 50 },
  { label: 30, lineValue: 51, barValue: 100 },
  { label: 40, lineValue: 2, barValue: 60 },
  { label: 50, lineValue: 5, barValue: 90 },
  { label: 60, lineValue: 25, barValue: 120 },
  { label: 70, lineValue: 12, barValue: 60 },
  { label: 80, lineValue: 19, barValue: 7 },
  { label: 90, lineValue: 95, barValue: 33 },
  { label: 100, lineValue: 1, barValue: 77 },
];

storiesOf("Combined Chart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <CombinedChart data={object("Data", data, "Data Knob")} />
  ));
