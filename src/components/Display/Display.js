import React from 'react';
import styles from './Display.module.css';

const Display = props => {
  const string = props.data.join('');
  return <div className={styles.Display}>{string}</div>;
};

export default Display;
