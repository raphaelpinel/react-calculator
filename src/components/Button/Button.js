import React from 'react';
import styles from './Button.module.css';

const Button = props => (
  <div className={styles.Button} data-value={props.value}>
    {props.label}
  </div>
);

export default Button;
