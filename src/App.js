import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header.js'
import Main from './main.js'
import MainDetail from './mainDetail.js'
import Sidebar from './sidebar.js'
import SidebarDetail from './sidebarDetail.js'
import NotesContext from './notesContext'
import config from './config'
import AddFolder from './addFolder'
import AddNote from './addNote'
//import ErrorBoundary from './errorBoundary'
import './App.css'

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

  addFolder = (name, id) => {
    this.setState({
      folders: [...this.state.folders, {name, id}]
    })
  }

  addNote = (name, id, folderId, modified, content) => {
    this.setState({
      notes: [...this.state.notes, {name, id, folderId, modified, content}]
    })
  }

  validateName(name) {
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    } else if (name.length > 49) {
      return 'Name must be less than 50 characters long';
    }
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
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      validateName: this.validateName
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <section className="App">
            <section className="Section_All">
              <section className="Section_Header">
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
            </section>
            <section className="Section_Sidebar">
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
            </section>
            <section className="Section_Main">

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
                    <Route 
                      path="/add-folder" 
                      component={AddFolder}
                    />
                    <Route 
                      path="/add-note" 
                      component={AddNote}
                    />
                  </Switch>

            </section>
          </section>
        </section>
      </NotesContext.Provider>
    );
  } 
}

export default App;

