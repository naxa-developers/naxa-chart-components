import React from 'react';

const Button = ({ withCheckbox, label }) => (
  <p>
    {withCheckbox && <input type="checkbox"></input>}
    {label}
  </p>
);

export default Button;
