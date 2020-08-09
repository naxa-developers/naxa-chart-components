import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  object,
  number,
  select,
  array,
} from "@storybook/addon-knobs";
import StackedColumnChart from "./index";
import data from "./data.json";

//for fields to choose
let arrayData = [];
data.map((object) => {
  Object.entries(object).map((values) => {
    let valIndex = arrayData.findIndex((label) => label === values[0]);
    if (valIndex === -1) {
      arrayData.push(values[0]);
    }
    return true;
  });
});

storiesOf("Stacked Column Chart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <StackedColumnChart
      datas={object("Data", data, "Data Knob")}
      widthValue={number("Width", 960, "Width Knob")}
      heightValue={number("Height", 500, "Height Knob")}
      mainField={select("Fields", arrayData, arrayData[0], "Field Knob")}
      colorRange={array("Color Range", null, ",", "Color Range")}
    />
  ));
