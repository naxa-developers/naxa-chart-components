import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import SankeyMain from "./index.js";


storiesOf("Sankey", module)
    .addDecorator(withKnobs)
    .add("Default", () => (
        <SankeyMain />
    ));
