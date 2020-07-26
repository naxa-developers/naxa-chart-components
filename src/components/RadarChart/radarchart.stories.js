import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import RadarChart from "./index.js";

const data = [
  ["Leopard", "Cheetah", "Lion"],
  [
    [
      { axis: "Strength", value: 0.22 },
      { axis: "Agility", value: 0.28 },
      { axis: "Speed", value: 0.29 },
      { axis: "Stealth", value: 0.17 },
      { axis: "Sense", value: 0.22 },
      { axis: "Popularity", value: 0.12 },
    ],
    [
      { axis: "Strength", value: 0.27 },
      { axis: "Agility", value: 0.16 },
      { axis: "Speed", value: 0.35 },
      { axis: "Stealth", value: 0.13 },
      { axis: "Sense", value: 0.2 },
      { axis: "Popularity", value: 0.32 },
    ],
    [
      { axis: "Strength", value: 0.26 },
      { axis: "Agility", value: 0.1 },
      { axis: "Speed", value: 0.3 },
      { axis: "Stealth", value: 0.14 },
      { axis: "Sense", value: 0.22 },
      { axis: "Popularity", value: 0.4 },
    ],
  ],
];
storiesOf("Radar Chart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <RadarChart
      data={object("Data", data[1], "Data Knob")}
      categories={data[0]}
    />
  ));
