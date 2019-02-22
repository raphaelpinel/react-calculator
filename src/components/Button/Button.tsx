import React from 'react';
//import styles from './Button.module.css';
import './Button.css';

const Button = (props: any) => {
  // const classesArray = [styles.Button];
  // if (props.special) {
  //   const specialStyle = props.special;
  //   classesArray.push(styles[specialStyle], props.active ? styles.active : ''); //adding special css class in order to make buttons orange or lightgrey
  // }
  const classesArray = ['Button'];
  if (props.special) {
    classesArray.push(props.special, props.active ? 'active' : '');
  }
  return (
    <div
      //className={classesArray.join(' ')}
      //className={classesArray.join(' ')}
      className={props.className}
      data-value={props.value}
      onClick={props.click}
    >
      {/* use "x" as label for multiply */}
      {props.label ? props.label : props.value} 
    </div>
  );
};

export default Button;
