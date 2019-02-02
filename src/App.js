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
      firstOperator: '',
      operator: [],
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
    this.setState({
      display: displayCopy,
      shortMemory: displayCopy,
      memory: stateCopy.memory + currentValue
    });
  };

  operatorClick = event => {
    const stateCopy = Object.assign({}, this.state);
    const currentValue = event.currentTarget.dataset.value; // the operator entered by user

    // if the last entered operator is "*" or "/", calculate
    // if the the already contained operator is + or -

    if (!stateCopy.firstOperator) {
      console.log('no first operator');
      return this.setState({
        firstOperator: currentValue,
        display: eval(this.removeLastOperator(stateCopy.memory)).toString(),
        memory:
          eval(this.removeLastOperator(stateCopy.memory)).toString() +
          currentValue,
        resetDisplay: true,
        operator: stateCopy.operator.concat(currentValue)
      });
    } else if (
      (currentValue === '*' || currentValue === '/') &&
      (stateCopy.firstOperator === '+' || stateCopy.firstOperator === '-')
    ) {
      // don't calculate if it was + or -
      console.log('continue enter number');
      this.setState({
        memory: eval(this.removeLastOperator(stateCopy.memory)) + currentValue,
        resetDisplay: true
      });
    }

    this.setState({
      display: eval(this.removeLastOperator(stateCopy.memory)).toString(),
      memory:
        eval(this.removeLastOperator(stateCopy.memory)).toString() +
        currentValue,
      resetDisplay: true,
      operator: stateCopy.operator.concat(currentValue),
      firstOperator: ''
    });
  };
  percentage = event => {
    console.log('Sorry the percentage method has not yet been implemented');
  };
  inverse = () => {
    let displayCopy = Object.values(this.state)[0];
    const memoryCopy = Object.values(this.state)[1];
    if (displayCopy.charAt(0) === '-') {
      displayCopy = displayCopy.substr(1); //if it already starts with '-', remove the '-'
    } else {
      displayCopy = '-' + displayCopy; //otherwise, adds '-' before
    }
    this.setState({ display: displayCopy });
  };

  calculate = () => {
    console.log('calculate');

    let stateCopy = Object.assign({}, this.state);

    // if (stateCopy.memory[0] === '0') {
    //   //removes the initial zero to prevent octal problem. Try to delete this if statement and type "6 ="
    //   stateCopy.memory = '';
    // }

    const result = eval(this.removeLastOperator(stateCopy.memory)).toString();

    this.setState({
      display: result,
      memory: result,
      shortMemory: '',
      resetDisplay: true,
      firstOperator: ''
    });

    //case when the result and the last entered value are the same, it would be nice to force a refresh:
    if (result === this.state.display) {
      // example: try 49/7=
      console.log('same value! It would be nice to force update/refresh!');
      //force update
    }
  };
  removeLastOperator = string => {
    let result;
    const lastCharacter = string[string.length - 1];
    if (
      lastCharacter === '+' ||
      lastCharacter === '-' ||
      lastCharacter === '*' ||
      lastCharacter === '/'
    ) {
      result = string.slice(0, -1);
      console.log('modified string', result);
      return result;
    }
    console.log('untouched string', result);
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
    this.removeLastOperator(this.state.memory);
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
