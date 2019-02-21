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
      resetDisplay: false, // set to true when the user has entered an operator or "=", then immediately back to false so s/he can continue entering a number
    };
  }

  numberClick = event => {
    let { display, resetDisplay } = this.state;
    let value = event.currentTarget.dataset.value; //the digit the user typed
    let newDisplay = display + value;

    if(display === '0' && value !== '.') {
      // replaces the zero by the actual value
      newDisplay = value;
    }
    if(value === '.' && display.includes('.') ) {
      // prevents multiple '.'
      newDisplay = display;
    }
    if (resetDisplay) {
      newDisplay = value;
      // reset InputValue to allow user to enter 2nd part number after operator and stores the first part value to FirstPartValue.
      this.setState({
        resetDisplay: false
      });
    }
    // if (resetMemory) {
    //   // reset InputValue to reset after equal sign
    //   console.log('fired 30');
    //   this.setState({
    //     resetMemory: false
    //   });
    //   memory = '';
    // }
    // if (stateCopy.display === '0') {
    //   stateCopy.display = ''; // replaces the first zero with the actually typed digit
    //   console.log('fired 37');
    // }

    // if (display.length <= 11) {
    //   //limits the amount of digits the user can enter
       //display += value;
    // }
    // if (memory[0] === '0' && memory.match(/^\d+$/)) {
    //   //removes the initial zero to prevent octal problem. Try to delete this if statement and type "0006 ="
    //   memory = '';
    // }

    this.setState({
      display: newDisplay,
      //memory: result ? stateCopy.memory + result : stateCopy.memory + currentValue
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
      {value: '=', precedence: 0},
      {value: '%', precedence: 0},
    ];
    
    const selectedOperator = operators.filter(operator => operator.value === value)[0];

    if (selectedOperator.value === '=') {
      //prevent multiple equals
      if (resetDisplay && (/\d$/).test(memory.join(''))) {
        console.log("pressed = again")
      } else {
        console.log("pressed =")
      const preResult = resetDisplay ? memory.join('').slice(0, -1) : memory.join('') + display ;
      const result = preResult ?  safeEval(preResult).toString() : display;
      this.setState({memory: [], display: result});
      }
    } else if (selectedOperator.value === '%') {
      let result;
      if ((/[+-]/).test(memory[memory.length -1])) {
        console.log('+ or - at the end', memory[memory.length -1]); 
        const base = memory.join('').slice(0, -1);
        const finalOperator = memory.join('').slice(-1)
        result =  safeEval(base + finalOperator + base + "*" + display + "/100");
      } else {
        result =  safeEval(display + "/100").toString();
      }
      this.setState({display: result.toString(), memory: [result]});
      console.log('TCL: App -> result', result);

    } else if (memory.length === 0) {
      console.log('case first operator');
      this.setState({memory: memory.concat(display, value)});

    } else if (resetDisplay) {
      // if the user enters many times an operator, replace by the last one except if it is equal
      if ((/\d$/).test(memory[memory.length -1])) {
        // if memory has a digit at the end
        console.log('digit at the end, simply add operator')
        if ((/[+\-*/]/).test(value)) {
          // if the operator is not =
          this.setState({ memory: memory.concat(value) })
        }
      } else {
        // replace the last operator in memory by the new operator
      memory[memory.length -1] = memory[memory.length -1].slice(0, -1) + value;
      this.setState({memory});
      console.log('replaced last operator');
      }

    } else if (selectedOperator.precedence === precedence && waiting !== 0) {
      console.log ('partial  safeEvaluate');  
      // ex. 1+2*3* //6 // partial  safeEvaluate: memory was ["1+", "2*"] => ["1+", "6*"]
      const index = memory.length - 1 // 1 // could be also memory[waiting] 
      const result =  safeEval(memory[index] + display).toString();
      memory[index] = result + value;
      this.setState({ display: result, memory });

    } else if (selectedOperator.precedence <= precedence) {
      console.log ('case calculate all');
      // calculate all, ex: 2*2+ or 1+2*3+ // attention 1+2*3*5+ // should be 31
      const result =  safeEval(memory.concat(display).join('')).toString();
			console.log('TCL: App -> memory.concat(display).join("")', memory.concat(display).join(''))
			console.log('TCL: App -> result', result);
      this.setState({memory: [result].concat(value), display: result, waiting: 0});

    } else if (selectedOperator.precedence > precedence && waiting === 0) {
      console.log('case precedence > and waiting 0: wait and waiting++')
      // case 1+2* // need to wait: waiting++ // memory should be ["1+", "2*"]
      this.setState({ waiting: waiting +1, memory: memory.concat(display + value)});

    } else {
      this.setState({display: 'error'});
      alert("error !!!");
    }
      return this.setState({
        //memory: this.preventOperatorAtEnd(memory) + value,
        precedence: selectedOperator.precedence,
        resetDisplay: true,
      });
  };

  // preventLeadingZeros = memory => {
  //   //remove eventual leading zeros to prevent octal error
  //   const parts = memory.split(/(\+|-|\*|\/)/);
  //   return parts.map(part => part.replace(/00+/, '')).join('');
  // };

  // preventOperatorAtEnd = string => {
  //   //helper function to remove the last operator to prevent an error if  safeEval('6*') would be run, and to avoid multiple operators in memory
  //   let result;
  //   const lastCharacter = string[string.length - 1];
  //   if (
  //     lastCharacter === '+' ||
  //     lastCharacter === '-' ||
  //     lastCharacter === '*' ||
  //     lastCharacter === '/'
  //   ) {
  //     result = string.slice(0, -1);
  //     return result;
  //   }
  //   return string;
  // };

  fixFloatingPoint = val => {
    if (val) {
      return Number.parseFloat(val.toFixed(15));
    }
    return '0';
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
      waiting: 0
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Display display={this.state.display} />
        <div className="Buttons">
          <Button
            click={this.reset}
            value="AC"
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
