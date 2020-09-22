import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import Timelinechart from "./index.js";

const TimelineChartData = [
  { startdate: "1/11/2020", enddate:"2/11/2020", name:'event1' },
  { startdate: "4/11/2020", enddate:"6/11/2020", name:'event2' },
  { startdate: "2/11/2020", enddate:"15/11/2020", name:'event3' },
  { startdate: "13/11/2020", enddate:"20/11/2020", name:'event4' },
  { startdate: "19/11/2020", enddate:"25/11/2020", name:'event5' },
  { startdate: "23/11/2020", enddate:"30/11/2020", name:'event6' },

 
];

storiesOf("TimelineChart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Timelinechart TimelineChartData={object("Data", TimelineChartData, "Data Knob")} />
  ));
