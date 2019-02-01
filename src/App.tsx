import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display';
import Button from './components/Button/Button';

interface IState {
  result: number;
}
class App extends Component<
  {},
  { inputValue: string; operator: string; previousValue: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { inputValue: '10', operator: '', previousValue: '' };
  }

  numberClick = (event: any) => {
    const resultCopy = Object.values(this.state)[0];
    const currentValue = event.currentTarget.dataset.value;
    this.setState({ inputValue: currentValue.concat(resultCopy) });
  };
  operatorClick = (event: any) => {
    const currentValue = event.currentTarget.dataset.value;
    console.log(event.currentTarget.dataset);

    console.log('operatorClick', currentValue);
  };
  handleClick = (event: any) => {
    console.log('handleClick');
  };

  render() {
    return (
      <div className={styles.App}>
        <Display inputValue={this.state.inputValue} />
        <div className="Buttons">
          <Button
            click={this.handleClick}
            label="AC"
            value="AC"
            special="lightgrey"
          />
          <Button
            click={this.handleClick}
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
          <Button
            click={this.handleClick}
            label="="
            value="="
            special="orange"
          />
        </div>
      </div>
    );
  }
}

export default App;
