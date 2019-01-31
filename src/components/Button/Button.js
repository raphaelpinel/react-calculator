import React from 'react';
import styles from './Button.module.css';

const Button = props => {
  const classesArray = [styles.Button];
  if (props.special) {
    const specialStyle = props.special;
    classesArray.push(styles[specialStyle]); //adding special css class in order to make buttons orange or lightgrey
  }

  return (
    <div className={classesArray.join(' ')} data-value={props.value} active>
      {props.label}
    </div>
  );
};

export default Button;
