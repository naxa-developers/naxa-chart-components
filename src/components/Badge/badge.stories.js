import React from 'react';
import Badge from './index.js';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <Badge
      label={text('label', 'Default')}
      onClick={action('click', 'hello')}
    />
  ))
  .add('With Checkbox', () => (
    <Badge withCheckbox label="Primary Badge" onClick={action('click')} />
  ));
