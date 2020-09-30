import React from 'react';
import { storiesOf } from '@storybook/react';
import { object, withKnobs, number, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import HorizontalBarChart from '.';

const DATA = [
  { label: 'Bob', value: 33 },
  { label: 'Robin', value: 12 },
  { label: 'Anne', value: 41 },
  { label: 'Eve', value: 38 },
  { label: 'Chris', value: 30 },
  { label: 'Tom', value: 5 },
  { label: 'Stacy', value: 20 },
  { label: 'Charles', value: 13 },
  { label: 'Mary', value: 29 },
];

storiesOf('HorizontalBarChart', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div style={{ background: '#fff' }}>
      <HorizontalBarChart
        data={object('data', DATA, 'Data')}
        width={number('width', 900)}
        height={number('height', 500)}
        margin={object('Margin', { top: 20, right: 20, bottom: 30, left: 50 })}
        padding={number('Bar Padding', 0.3)}
        // label={false}
        colors={array('Color', ['#00796B'])}
        // onClick={data => console.log(data)}
        onClick={action('onClick')}
      />
    </div>
  ));
