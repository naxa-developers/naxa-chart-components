import React from "react";
import Sunburst from "./index.js";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import data from "./data";

storiesOf("Sunburst", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Sunburst data={data} width="700" height="700" count_member="size" />
  ));
