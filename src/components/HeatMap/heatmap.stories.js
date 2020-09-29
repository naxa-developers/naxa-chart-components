import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import HeatMap from './index.js';
import data from './data.json';

storiesOf('HeatMap', module)
  .addDecorator(withKnobs)
  .add('Default', () => <HeatMap data={object('Data', data)} />);
