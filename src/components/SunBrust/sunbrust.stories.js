import React from "react";
import Sunburst from "./index.js";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import data from "./data";
import data2 from "./data2";

storiesOf("Sunburst", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Sunburst
      data={object("Data", data, "Data Knob")}
      width={500}
      height={500}
      count_member="size"
    />
  ))
  .add("Take data color", () => (
    <Sunburst
      data={object("Data", data2, "Data Knob")}
      width={500}
      height={500}
      count_member="value"
    />
  ));
