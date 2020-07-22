import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import BarChart from "./index.js";

const data = [
  { label: 10, value: 20 },
  { label: 20, value: 50 },
  { label: 30, value: 100 },
  { label: 40, value: 60 },
  { label: 50, value: 90 },
  { label: 60, value: 120 },
  { label: 70, value: 60 },
  { label: 80, value: 7 },
  { label: 90, value: 33 },
  { label: 100, value: 77 },
];

storiesOf("BarChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => <BarChart data={object("Data", data, "Data Knob")} />);
