import React from 'react';
import styles from './Display.module.css';

const Display = props => {
  let display = props.display;
  let bigNumberStyle = null;
  if (display.length >= 10) {
    display =
      display.slice(0, display.length - 9) +
      ' ' +
      display.slice(display.length - 9, display.length - 6) +
      ' ' +
      display.slice(display.length - 6, display.length - 3) +
      ' ' +
      display.slice(display.length - 3, 100);
    bigNumberStyle = { fontSize: '40px' };
  }
  if (display.length >= 7 && display.length < 10) {
    display =
      display.slice(0, display.length - 6) +
      ' ' +
      display.slice(display.length - 6, display.length - 3) +
      ' ' +
      display.slice(display.length - 3, 100);
    bigNumberStyle = { fontSize: '55px' };
  }
  if (display.length >= 4 && display.length < 7) {
    display =
      display.slice(0, display.length - 3) +
      ' ' +
      display.slice(display.length - 3, 100);
  }
  return (
    <div className={styles.Display} style={bigNumberStyle}>
      <span>{display}</span>
    </div>
  );
};

export default Display;
