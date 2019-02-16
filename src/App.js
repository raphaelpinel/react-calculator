import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display.js';
import Button from './components/Button/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0', // the value displayed
      memory: '0', // where the numbers and operators are stored
      operator: '', // can be +, -, *, x
      resetDisplay: false, // set to true when the user has entered an operator or "=", then immediately back to false so s/he can continue entering a number
      resetMemory: false // set to true after equal
    };
  }

  numberClick = event => {
    const stateCopy = Object.assign({}, this.state);
    if (this.state.resetDisplay) {
      // reset InputValue to allow user to enter 2nd part number after operator and stores the first part value to FirstPartValue.
      this.setState({
        resetDisplay: false
      });
      stateCopy.display = '';
    }
    if (this.state.resetMemory) {
      // reset InputValue to reset after equal sign
      this.setState({
        resetMemory: false
      });
      stateCopy.memory = '';
    }
    if (stateCopy.display === '0' && stateCopy.memory === '0') {
      stateCopy.display = ''; // replaces the first zero with the actually typed digit
    }
    let currentValue = event.currentTarget.dataset.value; //the digit the user typed

    if (stateCopy.display.length <= 11) {
      //limits the amount of digits the user can enter
      stateCopy.display = stateCopy.display + currentValue;
    }
    if (stateCopy.memory[0] === '0' && stateCopy.memory.match(/^\d+$/)) {
      //removes the initial zero to prevent octal problem. Try to delete this if statement and type "0006 ="
      stateCopy.memory = '';
    }

    this.setState({
      display: stateCopy.display,
      memory: stateCopy.memory + currentValue
    });
  };

  operatorClick = event => {
    const stateCopy = Object.assign({}, this.state);
    const currentValue = event.currentTarget.dataset.value; // the operator entered by user

    if (
      // To enforce priority of calculation (* and / over + and -), check if the previous operator was + or - and prevent calculation.
      (currentValue === '*' || currentValue === '/') &&
      (stateCopy.operator === '+' || stateCopy.operator === '-')
    ) {
      if (stateCopy.memory[0] === '0') {
        //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
        stateCopy.memory = '';
      }
      return this.setState({
        memory: this.preventOperatorAtEnd(stateCopy.memory) + currentValue,
        resetDisplay: true,
        resetMemory: false,
        operator: currentValue
      });
    }

    stateCopy.memory = this.preventLeadingZeros(stateCopy.memory);
    this.setState({
      //default behavior to calculate
      display: this.fixFloatingPoint(
        eval(this.preventOperatorAtEnd(stateCopy.memory))
      ).toString(),
      memory:
        this.fixFloatingPoint(
          eval(this.preventOperatorAtEnd(stateCopy.memory))
        ).toString() + currentValue,
      resetDisplay: true,
      resetMemory: false,
      operator: currentValue
    });
  };

  preventLeadingZeros = memory => {
    //remove eventual leading zeros to prevent octal error
    const parts = memory.split(/(\+|-|\*|\/)/);
    return parts.map(part => part.replace(/0+/, '')).join('');
  };

  preventOperatorAtEnd = string => {
    //helper function to remove the last operator to prevent an error if eval('6*') would be run, and to avoid multiple operators in memory
    let result;
    const lastCharacter = string[string.length - 1];
    if (
      lastCharacter === '+' ||
      lastCharacter === '-' ||
      lastCharacter === '*' ||
      lastCharacter === '/'
    ) {
      result = string.slice(0, -1);
      return result;
    }
    return string;
  };

  fixFloatingPoint = val => {
    if (val) {
      return Number.parseFloat(val.toFixed(15));
    }
    return '0';
  };

  percentage = event => {
    const stateCopy = Object.assign({}, this.state);
    let newDisplay;
    let newMemory;
    if (stateCopy.operator === '+' || stateCopy.operator === '-') {
      newDisplay = this.fixFloatingPoint(
        (stateCopy.display / 100) *
          stateCopy.memory.slice(
            0,
            stateCopy.memory.length - stateCopy.display.length - 1
          )
      ).toString();

      newMemory = (
        stateCopy.memory.slice(
          0,
          stateCopy.memory.length - stateCopy.display.length
        ) + newDisplay
      ).toString();
    } else {
      newDisplay = (stateCopy.display / 100).toString();
      newMemory = (
        stateCopy.memory.slice(
          0,
          stateCopy.memory.length - stateCopy.display.length
        ) + newDisplay
      ).toString();
    }
    this.setState({
      display: newDisplay,
      memory: newMemory,
      resetDisplay: true,
      operator: ''
    });
  };

  inverse = () => {
    const stateCopy = Object.assign({}, this.state);
    const memory = stateCopy.memory;
    const display = stateCopy.display;
    const lastCharacter = memory[memory.length - 1];
    let firstPart;
    if (
      //remove the last operator if the user had already entered it
      lastCharacter === '+' ||
      lastCharacter === '-' ||
      lastCharacter === '*' ||
      lastCharacter === '/'
    ) {
      firstPart = memory.slice(0, memory.length - display.length - 1);
    } else {
      firstPart = memory.slice(0, memory.length - display.length);
    }
    // checks if the number starts already with a minus sign to remove it, otherwise adds it
    const newDisplay = (display.charAt(0) === '-') ? display.substr(1) : `-${display}`;
    this.setState({
      display: newDisplay,
      memory: firstPart + newDisplay
    });
  };

  calculate = () => {
    let stateCopy = Object.assign({}, this.state);

    if (stateCopy.memory[0] === '0' && stateCopy.memory.match(/^\d+$/)) {
      //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
      stateCopy.memory = '';
    }

    const result = this.fixFloatingPoint(
      eval(
        this.preventOperatorAtEnd(this.preventLeadingZeros(stateCopy.memory))
      )
    ).toString();

    this.setState({
      display: result,
      memory: result,
      resetDisplay: true,
      resetMemory: true,
      operator: ''
    });

    //case when the result and the last entered value are the same, it would be nice to force a refresh:
    if (result === this.state.display) {
      // example: try 49/7=
      //force update
    }
  };

  reset = () => {
    this.setState({
      display: '0',
      memory: '0',
      resetDisplay: true
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Display display={this.state.display} />
        <div className="Buttons">
          <Button
            click={this.reset}
            label="AC"
            value="AC"
            special="lightgrey"
          />
          <Button
            click={this.inverse}
            label="+/-"
            value="+/-"
            special="lightgrey"
          />
          <Button
            click={this.percentage}
            label="%"
            value="%"
            special="lightgrey"
          />
          <Button
            click={this.operatorClick}
            label="/"
            value="/"
            special="orange"
          />

          <Button click={this.numberClick} label="7" value="7" />
          <Button click={this.numberClick} label="8" value="8" />
          <Button click={this.numberClick} label="9" value="9" />
          <Button
            click={this.operatorClick}
            label="x"
            value="*"
            special="orange"
          />

          <Button click={this.numberClick} label="4" value="4" />
          <Button click={this.numberClick} label="5" value="5" />
          <Button click={this.numberClick} label="6" value="6" />
          <Button
            click={this.operatorClick}
            label="-"
            value="-"
            special="orange"
          />

          <Button click={this.numberClick} label="1" value="1" />
          <Button click={this.numberClick} label="2" value="2" />
          <Button click={this.numberClick} label="3" value="3" />
          <Button
            click={this.operatorClick}
            label="+"
            value="+"
            special="orange"
          />

          <Button
            click={this.numberClick}
            label="0"
            value="0"
            special="double"
          />
          <Button click={this.numberClick} label="." value="." />
          <Button click={this.calculate} label="=" value="=" special="orange" />
        </div>
      </div>
    );
  }
}

export default App;
