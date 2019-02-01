import React from 'react';
import styles from './Display.module.css';

const Display = (props: any) => {
  return (
    <div className={styles.Display}>
      <span>{props.inputValue}</span>
    </div>
  );
};

export default Display;
