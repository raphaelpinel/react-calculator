import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display';
import Button from './components/Button/Button';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Display data={['0000000']} />
        <div className="Buttons">
          <Button label="AC" value="AC" special="lightgrey" />
          <Button label="+/-" value="+/-" special="lightgrey" />
          <Button label="%" value="%" special="lightgrey" />
          <Button label="/" value="/" special="orange" />

          <Button label="7" value="7" />
          <Button label="8" value="8" />
          <Button label="9" value="9" />
          <Button label="x" value="x" special="orange" />

          <Button label="4" value="4" />
          <Button label="5" value="5" />
          <Button label="6" value="6" />
          <Button label="-" value="-" special="orange" />

          <Button label="1" value="1" />
          <Button label="2" value="2" />
          <Button label="3" value="3" />
          <Button label="+" value="+" special="orange" />

          <Button label="0" value="0" special="double" />
          <Button label="." value="." />
          <Button label="=" value="=" special="orange" />
        </div>
      </div>
    );
  }
}

export default App;
