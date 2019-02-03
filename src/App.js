import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display.js';
import Button from './components/Button/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0', // the value displayed
      memory: '', // where the numbers and operators are stored
      calculate: false,
      previousOperator: '',
      operator: '',
      resetDisplay: false // set to true when the user has entered an operator or "=", then immediately back to false so s/he can continue entering a number
    };
  }

  numberClick = event => {
    const stateCopy = Object.assign({}, this.state);

    let displayCopy = Object.values(this.state)[0];
    if (this.state.resetDisplay) {
      // reset InputValue to allow user to enter 2nd part number after operator and stores the first part value to FirstPartValue.
      this.setState({
        resetDisplay: false
      });
      displayCopy = '';
    }
    if (displayCopy === '0') {
      displayCopy = ''; // replaces the first zero with the actually typed digit
    }
    let currentValue = event.currentTarget.dataset.value; //the digit the user typed

    if (displayCopy.length <= 11) {
      //limits the amount of digits the user can enter
      displayCopy = displayCopy + currentValue;
    }
    if (stateCopy.memory[0] === '0') {
      //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
      stateCopy.memory = '';
    }
    this.setState({
      display: displayCopy,
      shortMemory: displayCopy,
      memory: stateCopy.memory + currentValue
    });
  };

  operatorClick = event => {
    const stateCopy = Object.assign({}, this.state);
    const currentValue = event.currentTarget.dataset.value; // the operator entered by user

    // To enforce priority of calculation (* and / over + and -), check if the previous operator was + or - and prevent calculation.

    if (currentValue === '*' || currentValue === '/') {
      console.log('* or /');
      console.log('stateCopy.previousOperator', stateCopy.previousOperator);
      console.log(stateCopy);
    }
    if (
      stateCopy.previousOperator === '+' ||
      stateCopy.previousOperator === '-'
    ) {
      console.log('previous Operator is + or -');
    }

    if (
      (currentValue === '*' || currentValue === '/') &&
      (stateCopy.operator === '+' || stateCopy.operator === '-')
    ) {
      // don't calculate if it was + or -
      console.log('continue enter number');

      if (stateCopy.memory[0] === '0') {
        //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
        stateCopy.memory = '';
      }
      return this.setState({
        memory: this.preventOperatorAtEnd(stateCopy.memory) + currentValue,
        resetDisplay: true,
        operator: currentValue
      });
    }

    this.setState({
      //default behavior to calculate
      display: eval(this.preventOperatorAtEnd(stateCopy.memory)).toString(),
      memory:
        eval(this.preventOperatorAtEnd(stateCopy.memory)).toString() +
        currentValue,
      resetDisplay: true,
      operator: currentValue,
      previousOperator: stateCopy.operator
    });
  };
  percentage = event => {
    console.log('Sorry the percentage method has not yet been implemented');
  };
  inverse = () => {
    let displayCopy = Object.values(this.state)[0];
    if (displayCopy.charAt(0) === '-') {
      displayCopy = displayCopy.substr(1); //if it already starts with '-', remove the '-'
    } else {
      displayCopy = '-' + displayCopy; //otherwise, adds '-' before
    }
    this.setState({ display: displayCopy });
  };

  calculate = () => {
    let stateCopy = Object.assign({}, this.state);

    if (stateCopy.memory[0] === '0') {
      //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
      stateCopy.memory = '';
    }

    const result = eval(this.preventOperatorAtEnd(stateCopy.memory)).toString();

    this.setState({
      display: result,
      memory: result,
      shortMemory: '',
      resetDisplay: true,
      previousOperator: '',
      operator: ''
    });

    //case when the result and the last entered value are the same, it would be nice to force a refresh:
    if (result === this.state.display) {
      // example: try 49/7=
      console.log('same value! It would be nice to force update/refresh!');
      //force update
    }
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

  reset = () => {
    this.setState({
      display: '0',
      memory: '',
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
