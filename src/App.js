import React, { Component } from 'react';
import './App.css';
import Header from './header.js';
import Main from './main.js';
import Sidebar from './sidebar.js';
import Store from './dummy-store.js';

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    this.setState({folders: Store.folders, notes: Store.notes})
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="Section">
          <Sidebar className="Left-Half"
            folders={this.state.folders}
          />
        </div>
        <div className="Section">
          <Main className="Right-Half"
            notes={this.state.notes}
          />
        </div>
      </div>
    );
  }
}

export default App;
