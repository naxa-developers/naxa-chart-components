import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object } from "@storybook/addon-knobs";
import GanttChart from "./index.js";

const data = [
  {
    startDate: "2017-02-23",
    endDate: "2017-03-01",
    label: "task1",
    id: "task1",
    color: "blue",
    dependsOn: [],
  },
  {
    startDate: "2017-02-27",
    endDate: "2017-03-04",
    label: "task2",
    id: "task2",
    color: "red",
    dependsOn: [],
  },
  {
    startDate: "2017-03-01",
    duration: [12, "days"],
    label: "task3",
    id: "task3",
    color: "purple",
    dependsOn: ["task1"],
  },
  {
    duration: [7, "days"],
    endDate: "2017-03-24",
    label: "task4",
    id: "task4",
    color: "green",
    dependsOn: ["task2", "task1"],
  },
  {
    endDate: "2017-03-29",
    duration: [5, "days"],
    label: "task5",
    id: "task5",
    color: "orange",
    dependsOn: ["task3"],
  },
];

storiesOf("Gantt Chart", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <GanttChart
      data={object("Data", data, "Data Knob")}
      title={text("Title", "Gantt Chart", "Title Knob")}
    />
  ));
