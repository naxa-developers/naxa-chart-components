import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import StackedBarChart from './index.js';

const data = [
  {
    group: 'banana',
    Nitrogen: 12,
    normal: 1,
    stress: 13,
  },
  {
    group: 'poacee',
    Nitrogen: 6,
    normal: 6,
    stress: 33,
  },
  {
    group: 'sorgho',
    Nitrogen: 11,
    normal: 28,
    stress: 12,
  },
  {
    group: 'triticum',
    Nitrogen: 19,
    normal: 6,
    stress: 1,
  },
];
storiesOf('StackedBarChart', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <StackedBarChart data={object('Data', data, 'Data Knob')} />
  ));
