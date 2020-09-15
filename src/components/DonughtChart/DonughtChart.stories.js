import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, object, text, array } from "@storybook/addon-knobs";
import DonughtChart from "./DonughtChart";
import DataJs from "./Data.json";

storiesOf("Donught Chart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <DonughtChart
      DataJs={object("Data", DataJs, "Data Knob")}
      title={text("Title", "Number of live website built using", "Title Knob")}
      colorRange={array("Color Range", null, ",", "Color Range")}
    />
  ));
