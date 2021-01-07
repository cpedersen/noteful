import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/header.js'
import Main from '../Main/main.js'
import MainDetail from '../MainDetail/mainDetail.js'
import Sidebar from '../Sidebar/sidebar.js'
import SidebarDetail from '../SidebarDetail/sidebarDetail.js'
import NotesContext from '../notesContext'
import config from '../config'
import AddFolder from '../AddFolder/addFolder'
import AddNote from '../AddNote/addNote'
import ErrorBoundary from '../errorBoundary'
import './App.css'

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setData = (notes, folders) => {
    console.log(notes, folders)
    this.setState({
      notes,
      folders,
      error: null
    })
  }

  //Keeping debug commented out below for future reference.
  deleteNote = note_id => {
    let requestOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log("fetch: " + config.API_ENDPOINT + "/api/notes/" + note_id)
    fetch(config.API_ENDPOINT + "/api/notes/" + note_id, requestOptions)
      .then(response => response.text())
      //.then(console.log)
      //.then(response => response.json())
      .then(result => {
        //console.log(result)
        const newNotes = this.state.notes.filter(note => note.id !== note_id)
        this.setState({
          notes: newNotes
          })
      })
  }

  addFolder = (title, id) => {
    this.setState({
      folders: [...this.state.folders, {title, id}]
    })
  }

  addNote = (title, id, folder_id, date_modified, content) => {
    this.setState({
      notes: [...this.state.notes, {title, id, folder_id, date_modified, content}]
    })
  }

  validateName(title) {
    if (title.length === 0) {
      return 'Name is required';
    } else if (title.length < 3) {
      return 'Name must be at least 3 characters long';
    } else if (title.length > 49) {
      return 'Name must be less than 50 characters long';
    }
  }

  componentDidMount() {
    Promise.all([
      fetch(config.API_ENDPOINT + "/api/notes"),
      fetch(config.API_ENDPOINT + "/api/folders")
    ])
    .then(responses => {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    })
    .then(results => {
      //this.setData(results[0], results[1])
      this.setState({
        notes: results[0],
        folders: results[1]
      })
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
                  path="/api/folder/:folder_id" 
                  component={Header}
                />
                <Route
                  path="/api/note/:note_id" 
                  component={Header}
                />
                <Route
                  path="/api/note/add-note" 
                  component={Header}
                />
                <Route
                  path="/api/note/add-folder" 
                  component={Header}
                />
              </Switch>
            </section>
            <section className="Section_SidebarMain">
              <section className="Section_Sidebar">
                  <Switch>
                      <Route 
                        exact path="/" 
                        component={Sidebar}
                      />
                      <Route className="Section_Sidebar_Mobile"
                        path="/api/folder/:folder_id" 
                        component={Sidebar}
                      />
                      <Route 
                        path="/api/note/:note_id" 
                        component={SidebarDetail}
                      />
                  </Switch>
              </section>
              <section className="Section_Main">
                  <ErrorBoundary>
                    <Switch>
                      <Route 
                        exact path="/" 
                        component={Main}
                        />
                      <Route 
                        path="/api/folder/:folder_id" 
                        component={Main}
                      />
                      <Route 
                        path="/api/note/:note_id" 
                        component={MainDetail}
                      />
                      <Route 
                        path="/api/add-folder" 
                        component={AddFolder}
                      />
                      <Route 
                        path="/api/add-note" 
                        component={AddNote}
                      />
                    </Switch>
                  </ErrorBoundary>
              </section>
            </section>
          </section>
        </section>
      </NotesContext.Provider>
    );
  } 
}

export default App;

