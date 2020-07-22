import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import LineChart from "./index.js";

const lineChartData = [
  { date: "1/11/2020", open: 6, approved: 11, flagged: 12, rejected: 15 },
  { date: "2/11/2020", open: 2, approved: 11, flagged: 16, rejected: 22 },
  { date: "3/11/2020", open: 7, approved: 15, flagged: 16, rejected: 20 },
  { date: "4/11/2020", open: 8, approved: 12, flagged: 18, rejected: 22 },
  { date: "5/11/2020", open: 6, approved: 10, flagged: 12, rejected: 24 },
  { date: "6/11/2020", open: 6, approved: 10, flagged: 12, rejected: 13 },
];

storiesOf("LineChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <LineChart lineChartData={object("Data", lineChartData, "Data Knob")} />
  ));
