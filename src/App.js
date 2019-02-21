import React, { Component } from 'react';
import safeEval from 'safe-eval';
import styles from './App.module.css';

import Display from './components/Display/Display.js';
import Button from './components/Button/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0', // the value displayed
      precedence: 0,
      waiting: 0,
      memory: [], // where the numbers and operators are stored
      resetDisplay: false, // set to true when the user has entered an operator or "=", 
      //then immediately back to false so s/he can continue entering a number
      resetButton: 'AC'
    };
  }

  fixFloatingPoint = val => {
    if (val) {
      return Number.parseFloat(val.toFixed(15));
    }
    return '0';
  };
  
  safeEval2 = val => this.fixFloatingPoint(safeEval(val));

  numberClick = event => {
    let { display, resetDisplay, resetButton } = this.state;
    let value = event.currentTarget.dataset.value; //the digit the user typed
    let newDisplay = display + value;

    if (value !== '0') {
      this.setState({ resetButton: 'C' });
    }

    if(display === '0' && value !== '.') {
      // replaces the zero by the actual value
      newDisplay = value;
    }
    if(value === '.' && display.includes('.') ) {
      // prevents multiple '.'
      newDisplay = display;
    }
    if (resetDisplay) {
      newDisplay = value === '.' ? '0.' : value;
      // reset InputValue to allow user to enter 2nd part number after operator and stores the first part value to FirstPartValue.
      this.setState({
        resetDisplay: false
      });
    }
    this.setState({
      display: newDisplay,
    });
  };

  operatorClick = event => {
    let { display, precedence, memory, resetDisplay, waiting } = this.state
    const value = event.currentTarget.dataset.value; // the operator entered by user
    
    const operators = [
      {value: '+', operation(a, b) {return a + b}, precedence: 1},
      {value: '-', operation(a, b) {return a - b}, precedence: 1},
      {value: '*', operation(a, b) {return a * b}, precedence: 2},
      {value: '/', operation(a, b) {return a / b}, precedence: 2},
      {value: '='},
      {value: '%'},
    ];
    
    const selectedOperator = operators.filter(operator => operator.value === value)[0];

    if (selectedOperator.value === '=' && !(resetDisplay && (/\d$/).test(memory.join('')))) {
      //prevent multiple equals
      const preResult = resetDisplay ? memory.join('').slice(0, -1) : memory.join('') + display ;
      const result = preResult ? this.safeEval2(preResult).toString() : display;
      this.setState({memory: [], display: result});

    } else if (selectedOperator.value === '%') {
      let result;
      if ((/[+-]/).test(memory[memory.length -1])) {
        const base = memory.join('').slice(0, -1);
        const finalOperator = memory.join('').slice(-1)
        result = this.safeEval2(`${base}${finalOperator}${base}*${display}/100`);
      } else {
        result = this.safeEval2(`${display}/100`).toString();
      }
      this.setState({display: result.toString(), memory: []});

    } else if (memory.length === 0) {
      this.setState({memory: memory.concat(display, value)});

    } else if (resetDisplay) {
      // if the user enters many times an operator, replace by the last one except if it is equal
      memory[memory.length -1] = memory[memory.length -1].slice(0, -1) + value;
      this.setState({memory});

    } else if (selectedOperator.precedence === precedence && waiting !== 0) {
      // ex. 1+2*3* //6 // partial evaluate: memory was ["1+", "2*"] => ["1+", "6*"]
      const index = memory.length - 1 // 1 // could be also memory[waiting] 
      const result =  this.safeEval2(memory[index] + display).toString();
      memory[index] = result + value;
      this.setState({ display: result, memory });

    } else if (selectedOperator.precedence <= precedence) {
      // calculate all, ex: 2*2+ or 1+2*3+ // attention 1+2*3*5+ // should be 31
      const result =  this.safeEval2(memory.concat(display).join('')).toString();
      this.setState({memory: [result].concat(value), display: result, waiting: 0});

    } else if (selectedOperator.precedence > precedence && waiting === 0) {
      // case 1+2* // need to wait: waiting++ // memory should be ["1+", "2*"]
      this.setState({ waiting: waiting +1, memory: memory.concat(display + value)});

    } else {
      this.setState({display: 'error'});
      alert("error !!!");
    }
      return this.setState({
        precedence: selectedOperator.precedence,
        resetDisplay: true,
      });
  };

  inverse = () => {
    const { display } = this.state;
    // checks if the number starts already with a minus sign to remove it, otherwise adds it
    const newDisplay = (display.charAt(0) === '-') ? display.substr(1) : `-${display}`;
    this.setState({
      display: newDisplay
    });
  };

  reset = () => {
    this.setState({
      display: '0',
      memory: [],
      resetDisplay: false,
      precedence: 0,
      waiting: 0,
      resetButton: 'AC',
    });
  };

  render() {
    const { display, resetButton } = this.state;
    return (
      <div className={styles.App}>
        <Display display={display} />
        <div className="Buttons">
          <Button
            click={this.reset}
            value={ resetButton }
            special="lightgrey"
          />
          <Button
            click={this.inverse}
            value="+/-"
            special="lightgrey"
          />
          <Button
            click={this.operatorClick}
            value="%"
            special="lightgrey"
          />
          <Button
            click={this.operatorClick}
                        value="/"
            special="orange"
          />

          <Button click={this.numberClick} value="7" />
          <Button click={this.numberClick} value="8" />
          <Button click={this.numberClick} value="9" />
          <Button
            click={this.operatorClick}
            value="*" label="x"
            special="orange"
          />

          <Button click={this.numberClick} value="4" />
          <Button click={this.numberClick} value="5" />
          <Button click={this.numberClick} value="6" />
          <Button
            click={this.operatorClick}
            value="-"
            special="orange"
          />

          <Button click={this.numberClick} value="1" />
          <Button click={this.numberClick} value="2" />
          <Button click={this.numberClick} value="3" />
          <Button
            click={this.operatorClick}
            value="+"
            special="orange"
          />

          <Button
            click={this.numberClick}
            value="0"
            special="double"
          />
          <Button click={this.numberClick} value="." />
          <Button click={this.operatorClick} value="=" special="orange" />
        </div>
      </div>
    );
  }
}

export default App;
