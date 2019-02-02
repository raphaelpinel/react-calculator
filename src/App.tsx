import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display.js';
import Button from './components/Button/Button';

interface IState {
  result: number;
}
//{ inputValue: string; operator: string; firstPartValue: string }
class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '0', // the value displayed
      operator: '', // an operator can be "x, +, -, /"
      firstPartValue: '', // after the user has entered an operator (x, +, -, /), the number displayed previously moves to firsPartValue
      resetFirstPart: false // set to true when the user has entered an operator or "=", then immediately back to false so s/he can continue entering a number
    };
  }

  numberClick = (event: any) => {
    let inputValueCopy = Object.values(this.state)[0];
    if (this.state.resetFirstPart) {
      // reset InputValue to allow user to enter 2nd part number after operator and stores the first part value to FirstPartValue.
      this.setState({
        inputValue: '0',
        firstPartValue: inputValueCopy,
        resetFirstPart: false
      });
      inputValueCopy = '0';
    }
    if (inputValueCopy === '0') {
      inputValueCopy = ''; // replaces the first zero with the actually typed digit
    }
    let currentValue = event.currentTarget.dataset.value; //the digit the user typed

    let result = inputValueCopy;
    if (inputValueCopy.length <= 11) {
      //limits the amount of digits the user can enter
      result = inputValueCopy.concat(currentValue);
    }
    this.setState({ inputValue: result });
  };
  operatorClick = (event: any) => {
    const currentValue = event.currentTarget.dataset.value;
    let inputValueCopy = Object.values(this.state)[0]; //makes a copy of the number currently displayed in order
    // copy the previous inputValue to the state as previousValue
    this.setState({ operator: currentValue, resetFirstPart: true });
  };
  handleClick = (event: any) => {
    console.log('handleClick');
  };
  inverse = () => {
    let inputCopy = Object.values(this.state)[0];
    const minus = '-';
    if (inputCopy.charAt(0) === minus) {
      inputCopy = inputCopy.substr(1);
    } else {
      inputCopy = minus.concat(inputCopy);
    }
    this.setState({ inputValue: inputCopy });
  };

  calculate = () => {
    const lastEnteredValue = this.state.inputValue;
    const operator = this.state.operator;
    let ValueEnteredBefore = this.state.firstPartValue;
    //removes the initial zero if it occurs, try "6 ="
    for (let i = 0; i < ValueEnteredBefore.length; i++) {
      if (ValueEnteredBefore[0] === '0') {
        ValueEnteredBefore = '';
        console.log('leading zero');
      }
    }
    const result = eval(
      ValueEnteredBefore.concat(operator, lastEnteredValue)
    ).toString();

    this.setState({
      inputValue: result,
      operator: '',
      firstPartValue: '',
      resetFirstPart: true
    });

    //case when the result and the last entered value are the same, it would be nice to force a refresh:
    if (result === lastEnteredValue) {
      // example: try 49/7=
      console.log('same value! It would be nice to force update/refresh!');
      //force update
    }
  };
  reset = () => {
    this.setState({
      inputValue: '0',
      operator: '',
      previousValue: '',
      resetFirstPart: true
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Display inputValue={this.state.inputValue} />
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
            click={this.handleClick}
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
