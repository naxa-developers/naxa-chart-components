import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number, boolean, object } from "@storybook/addon-knobs";
import BarChart from "./index.js";

const data = [
  {
    label: 68,
    value: 154,
  },
  {
    label: 16,
    value: 92,
  },
  {
    label: 46,
    value: 67,
  },
  {
    label: 40,
    value: 85,
  },
  {
    label: 95,
    value: 175,
  },
  {
    label: 79,
    value: 109,
  },
  {
    label: 93,
    value: 0,
  },
  {
    label: 80,
    value: 146,
  },
  {
    label: 19,
    value: 114,
  },
  {
    label: 48,
    value: 136,
  },
  {
    label: 44,
    value: 121,
  },
  {
    label: 29,
    value: 194,
  },
  {
    label: 11,
    value: 117,
  },
  {
    label: 17,
    value: 113,
  },
  {
    label: 15,
    value: 88,
  },
  {
    label: 50,
    value: 57,
  },
  {
    label: 81,
    value: 156,
  },
  {
    label: 46,
    value: 197,
  },
  {
    label: 58,
    value: 138,
  },
  {
    label: 27,
    value: 188,
  },
  {
    label: 42,
    value: 199,
  },
  {
    label: 69,
    value: 104,
  },
  {
    label: 58,
    value: 77,
  },
  {
    label: 42,
    value: 167,
  },
  {
    label: 95,
    value: 76,
  },
  {
    label: 34,
    value: 65,
  },
  {
    label: 66,
    value: 144,
  },
  {
    label: 66,
    value: 99,
  },
  {
    label: 60,
    value: 99,
  },
  {
    label: 73,
    value: 110,
  },
  {
    label: 24,
    value: 115,
  },
  {
    label: 38,
    value: 89,
  },
  {
    label: 24,
    value: 172,
  },
  {
    label: 54,
    value: 181,
  },
  {
    label: 13,
    value: 176,
  },
  {
    label: 58,
    value: 190,
  },
  {
    label: 32,
    value: 148,
  },
  {
    label: 84,
    value: 6,
  },
  {
    label: 16,
    value: 83,
  },
  {
    label: 41,
    value: 189,
  },
  {
    label: 80,
    value: 152,
  },
  {
    label: 93,
    value: 17,
  },
  {
    label: 83,
    value: 93,
  },
  {
    label: 60,
    value: 172,
  },
  {
    label: 32,
    value: 56,
  },
  {
    label: 66,
    value: 25,
  },
  {
    label: 37,
    value: 49,
  },
  {
    label: 46,
    value: 68,
  },
  {
    label: 50,
    value: 121,
  },
  {
    label: 29,
    value: 45,
  },
  {
    label: 86,
    value: 45,
  },
  {
    label: 26,
    value: 186,
  },
  {
    label: 28,
    value: 82,
  },
  {
    label: 29,
    value: 163,
  },
  {
    label: 30,
    value: 0,
  },
  {
    label: 62,
    value: 23,
  },
  {
    label: 80,
    value: 48,
  },
  {
    label: 100,
    value: 186,
  },
  {
    label: 74,
    value: 76,
  },
  {
    label: 74,
    value: 121,
  },
  {
    label: 80,
    value: 14,
  },
  {
    label: 75,
    value: 21,
  },
  {
    label: 13,
    value: 77,
  },
  {
    label: 47,
    value: 195,
  },
  {
    label: 91,
    value: 169,
  },
  {
    label: 53,
    value: 76,
  },
  {
    label: 31,
    value: 34,
  },
  {
    label: 86,
    value: 1,
  },
  {
    label: 68,
    value: 31,
  },
  {
    label: 84,
    value: 80,
  },
  {
    label: 50,
    value: 48,
  },
  {
    label: 68,
    value: 118,
  },
  {
    label: 15,
    value: 98,
  },
  {
    label: 74,
    value: 199,
  },
  {
    label: 15,
    value: 35,
  },
  {
    label: 57,
    value: 172,
  },
  {
    label: 64,
    value: 12,
  },
  {
    label: 34,
    value: 123,
  },
  {
    label: 37,
    value: 154,
  },
  {
    label: 25,
    value: 69,
  },
  {
    label: 53,
    value: 195,
  },
  {
    label: 58,
    value: 47,
  },
  {
    label: 62,
    value: 96,
  },
  {
    label: 59,
    value: 93,
  },
  {
    label: 48,
    value: 171,
  },
  {
    label: 91,
    value: 190,
  },
  {
    label: 42,
    value: 161,
  },
  {
    label: 43,
    value: 63,
  },
  {
    label: 13,
    value: 131,
  },
  {
    label: 13,
    value: 179,
  },
  {
    label: 72,
    value: 13,
  },
  {
    label: 20,
    value: 88,
  },
  {
    label: 94,
    value: 192,
  },
  {
    label: 27,
    value: 79,
  },
  {
    label: 19,
    value: 168,
  },
  {
    label: 88,
    value: 128,
  },
  {
    label: 54,
    value: 80,
  },
  {
    label: 46,
    value: 36,
  },
  {
    label: 79,
    value: 89,
  },
  {
    label: 53,
    value: 38,
  },
  {
    label: 28,
    value: 279,
  },
  {
    label: 12,
    value: 387,
  },
  {
    label: 86,
    value: 333,
  },
  {
    label: 28,
    value: 390,
  },
  {
    label: 26,
    value: 309,
  },
  {
    label: 89,
    value: 217,
  },
  {
    label: 15,
    value: 319,
  },
  {
    label: 80,
    value: 205,
  },
  {
    label: 32,
    value: 282,
  },
  {
    label: 30,
    value: 211,
  },
  {
    label: 56,
    value: 297,
  },
  {
    label: 16,
    value: 265,
  },
  {
    label: 59,
    value: 211,
  },
  {
    label: 38,
    value: 374,
  },
  {
    label: 72,
    value: 223,
  },
  {
    label: 20,
    value: 278,
  },
  {
    label: 66,
    value: 326,
  },
  {
    label: 55,
    value: 396,
  },
  {
    label: 50,
    value: 295,
  },
  {
    label: 60,
    value: 384,
  },
  {
    label: 93,
    value: 376,
  },
  {
    label: 96,
    value: 348,
  },
  {
    label: 43,
    value: 377,
  },
  {
    label: 37,
    value: 398,
  },
  {
    label: 92,
    value: 228,
  },
  {
    label: 24,
    value: 230,
  },
  {
    label: 50,
    value: 362,
  },
  {
    label: 33,
    value: 297,
  },
  {
    label: 98,
    value: 251,
  },
  {
    label: 32,
    value: 384,
  },
  {
    label: 33,
    value: 328,
  },
  {
    label: 25,
    value: 261,
  },
  {
    label: 53,
    value: 368,
  },
  {
    label: 44,
    value: 346,
  },
  {
    label: 99,
    value: 203,
  },
  {
    label: 23,
    value: 312,
  },
  {
    label: 63,
    value: 287,
  },
  {
    label: 83,
    value: 269,
  },
  {
    label: 17,
    value: 274,
  },
  {
    label: 87,
    value: 262,
  },
  {
    label: 82,
    value: 208,
  },
  {
    label: 69,
    value: 309,
  },
  {
    label: 86,
    value: 236,
  },
  {
    label: 13,
    value: 340,
  },
  {
    label: 93,
    value: 251,
  },
  {
    label: 43,
    value: 342,
  },
  {
    label: 95,
    value: 226,
  },
  {
    label: 85,
    value: 239,
  },
  {
    label: 34,
    value: 272,
  },
  {
    label: 39,
    value: 339,
  },
  {
    label: 79,
    value: 238,
  },
  {
    label: 41,
    value: 392,
  },
  {
    label: 37,
    value: 355,
  },
  {
    label: 87,
    value: 352,
  },
  {
    label: 99,
    value: 289,
  },
  {
    label: 35,
    value: 327,
  },
  {
    label: 21,
    value: 368,
  },
  {
    label: 31,
    value: 290,
  },
  {
    label: 87,
    value: 318,
  },
  {
    label: 82,
    value: 382,
  },
  {
    label: 61,
    value: 286,
  },
  {
    label: 100,
    value: 286,
  },
  {
    label: 12,
    value: 357,
  },
  {
    label: 89,
    value: 329,
  },
  {
    label: 56,
    value: 285,
  },
  {
    label: 10,
    value: 221,
  },
  {
    label: 38,
    value: 351,
  },
  {
    label: 38,
    value: 357,
  },
  {
    label: 46,
    value: 281,
  },
  {
    label: 43,
    value: 357,
  },
  {
    label: 100,
    value: 292,
  },
  {
    label: 43,
    value: 327,
  },
  {
    label: 52,
    value: 375,
  },
  {
    label: 82,
    value: 396,
  },
  {
    label: 53,
    value: 302,
  },
  {
    label: 99,
    value: 239,
  },
  {
    label: 36,
    value: 269,
  },
  {
    label: 93,
    value: 390,
  },
  {
    label: 26,
    value: 359,
  },
  {
    label: 14,
    value: 261,
  },
  {
    label: 49,
    value: 246,
  },
  {
    label: 97,
    value: 331,
  },
  {
    label: 90,
    value: 267,
  },
  {
    label: 99,
    value: 335,
  },
  {
    label: 49,
    value: 292,
  },
  {
    label: 65,
    value: 249,
  },
  {
    label: 20,
    value: 355,
  },
  {
    label: 45,
    value: 217,
  },
  {
    label: 95,
    value: 287,
  },
  {
    label: 72,
    value: 276,
  },
  {
    label: 80,
    value: 397,
  },
  {
    label: 60,
    value: 346,
  },
  {
    label: 87,
    value: 319,
  },
  {
    label: 17,
    value: 261,
  },
  {
    label: 60,
    value: 341,
  },
  {
    label: 62,
    value: 331,
  },
  {
    label: 70,
    value: 352,
  },
  {
    label: 98,
    value: 327,
  },
  {
    label: 45,
    value: 266,
  },
  {
    label: 82,
    value: 390,
  },
];

storiesOf("Scatter Plot", module)
  .addDecorator(withKnobs)
  .add("Default", () => <BarChart data={object("Data", data, "Data Knob")} />);
