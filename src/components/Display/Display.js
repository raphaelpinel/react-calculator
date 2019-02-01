import React from 'react';
import styles from './Display.module.css';

const Display = props => {
  console.log(props.inputValue.length);
  let bigNumberStyle = null;
  if (props.inputValue.length > 6) {
    bigNumberStyle = { fontSize: '50px' };
  }
  if (props.inputValue.length > 10) {
    bigNumberStyle = { fontSize: '30px' };
  }
  if (props.inputValue.length > 17) {
    bigNumberStyle = { fontSize: '20px' };
  }

  return (
    <div className={styles.Display} style={bigNumberStyle}>
      <span>{props.inputValue}</span>
    </div>
  );
};

export default Display;
