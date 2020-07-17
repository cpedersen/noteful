import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header.js'
import Main from './main.js'
import MainDetail from './mainDetail.js'
import Sidebar from './sidebar.js'
import SidebarDetail from './sidebarDetail.js'
import NotesContext from './notesContext'
import './App.css'
import config from './config'
import AddFolder from './addFolder'
//import AddNote from './addNote'

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setData = (notes, folders) => {
    this.setState({
      notes,
      folders,
      error: null
    })
  }

  deleteNote = note_id => {
    fetch(config.API_ENDPOINT + "/notes/" + note_id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        const newNotes = this.state.notes.filter(note => note.id !== note_id)
        this.setState({
          notes: newNotes
        })
      })
  }

  componentDidMount() {
    Promise.all([
      fetch(config.API_ENDPOINT + "/notes"),
      fetch(config.API_ENDPOINT + "/folders")
    ])
    .then(responses => {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    })
    .then(results => {
      this.setData(results[0], results[1])
    })
    .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    }

    //console.log(this.state.notes)
    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <Switch>
            <Route
              exact path="/" 
              component={Header}
            />
            <Route 
              path="/folder/:folder_id" 
              component={Header}
            />
            <Route
              path="/note/:note_id" 
              component={Header}
            />
          </Switch>
          <div className="Section">
              <Switch>
                  <Route 
                    exact path="/" 
                    component={Sidebar}
                  />
                  <Route 
                    path="/folder/:folder_id" 
                    component={Sidebar}
                  />
                  <Route 
                    path="/note/:note_id" 
                    component={SidebarDetail}
                  />
              </Switch>
          </div>
          <div className="Section">
              <Switch>
                <Route 
                  exact path="/" 
                  component={Main}
                  />
                <Route 
                  path="/folder/:folder_id" 
                  component={Main}
                />
                <Route 
                  path="/note/:note_id" 
                  component={MainDetail}
                />
              </Switch>
          </div>
        </div>
      </NotesContext.Provider>
    );
  } 
}

export default App;

