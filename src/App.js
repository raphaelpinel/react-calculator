import React, { Component } from 'react';
import styles from './App.module.css';

import Display from './components/Display/Display';
import Button from './components/Button/Button';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Display data={[0]} />
        <div className="Buttons">
          <Button label="AC" value="AC" />
          <Button label="+/-" value="+/-" />
          <Button label="%" value="%" />
          <Button label="/" value="/" />

          <Button label="7" value="7" />
          <Button label="8" value="8" />
          <Button label="9" value="9" />
          <Button label="x" value="x" />

          <Button label="4" value="4" />
          <Button label="5" value="5" />
          <Button label="6" value="6" />
          <Button label="-" value="-" />

          <Button label="1" value="1" />
          <Button label="2" value="2" />
          <Button label="3" value="3" />
          <Button label="+" value="+" />

          <Button label="0" value="0" />
          <Button label="." value="." />
          <Button label="=" value="=" />
        </div>
      </div>
    );
  }
}

export default App;
