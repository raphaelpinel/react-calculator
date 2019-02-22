import React from 'react';
import './Button.css';

const Button = (props: any) => (
  <div
    className={props.className}
    data-value={props.value}
    onClick={props.click}
  >
    {/* use "x" as label for multiply */}
    {props.label ? props.label : props.value}
  </div>
);

export default Button;
