import React from 'react';
import styles from './Display.module.css';

const Display = props => {
  let display = props.display;
  if (display.length > 9) {
    display = Number.parseFloat(props.display).toExponential(7);
  }
  let bigNumberStyle = null;
  if (display.length >= 10) {
    bigNumberStyle = { fontSize: '40px' };
  }
  if (display.length >= 7 && display.length < 10) {
    bigNumberStyle = { fontSize: '50px' };
  }
  function add3digitsSeparator(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }
  return (
    <div className={styles.Display} style={bigNumberStyle}>
      <span>{add3digitsSeparator(display)}</span>
    </div>
  );
};

export default Display;
