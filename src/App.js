import React, { Component } from 'react';
import logo from './handshake.svg';
import './App.css';
import ImageUpload from './ImageUpload.js';
import TextUpload from './TextUpload.js';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

class App extends Component {
  render() {
    return (
        <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Secret Handshake</h1>
            </header>
            <div className="mui--text-black">
            <Tabs onChange={this.onChange} defaultSelectedIndex={0}>
                <Tab className="mui--text-black" value="pane-1" label="Text"><TextUpload/></Tab>
                <Tab className="mui--text-black" value="pane-2" label="Image"><ImageUpload/></Tab>
            </Tabs>
            </div>
        </div>
    );
  }
}

export default App;
