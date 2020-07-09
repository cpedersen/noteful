import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './header.js'
import Main from './main.js'
import MainDetail from './mainDetail.js'
import Sidebar from './sidebar.js'
import SidebarDetail from './sidebarDetail.js'
import Store from './dummy-store.js'
import NotesContext from './notesContext'
import './App.css'
import config from './config'

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setData = (notes, folders) => {
    //console.log("Inside setData: " + notes)
    this.setState({
      notes,
      folders,
      error: null
    })
  }

  //For delete, make another fetch call 
  /*deleteNote = note => {
    this.setState({
      notes: [ ... this.state.notes, note]
    })
  }*/

  componentDidMount() {
    //this.setState({folders: Store.folders, notes: Store.notes})

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
      //console.log("fetch results are " + results);
      this.setData(results[0], results[1])
    })
    .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <Header/>
          <div className="Section">
              <Switch>
                <Route 
                  exact path="/" 
                  /*render={(routerProps) =>
                    <Sidebar
                      folders={this.state.folders}
                    />
                  }*/
                  component={Sidebar}
                />
                <Route 
                  path="/folder/:folder_id" 
                  /*render={(routerProps) =>
                    <Sidebar
                      folders={this.state.folders}
                      selectedFolder={this.state.folders.find(folder => folder.id === routerProps.match.params.folder_id)}
                    />
                  }*/
                  component={Sidebar}
                />
                <Route 
                  path="/note/:note_id" 
                  /*render={(routerProps) =>
                    <SidebarDetail
                      folders={this.state.folders}
                      note={this.state.notes.find(note => note.id === routerProps.match.params.note_id)}
                    />
                  }*/
                  component={SidebarDetail}
                />
              </Switch>
              
          </div>
          <div className="Section">
              <Switch>
                <Route 
                  exact path="/" 
                  /*render={(routerProps) =>
                    <Main
                      notes={this.state.notes}
                    />
                  }*/
                  component={Main}
                  />
                <Route 
                  path="/folder/:folder_id" 
                  /*render={(routerProps) =>
                    <Main
                      notes={this.state.notes.filter(note => note.folderId === routerProps.match.params.folder_id)}
                    />
                  }*/
                  component={Main}
                />
                <Route 
                  path="/note/:note_id" 
                  /*render={(routerProps) =>
                    <MainDetail
                      note={this.state.notes.find(note => note.id === routerProps.match.params.note_id)}
                    />
                  }*/
                  component={MainDetail}
                />
              </Switch>

          </div>
        </div>
      </NotesContext.Provider>
    );
  } /* End return */


  /*return (
    <NotesContext.Provider value={contextValue}>
      <div className="App">
        <Header/>
        <div className="Section">
            <Switch>
              <Route 
                exact path="/" 
                render={(routerProps) =>
                  <Sidebar
                    folders={this.state.folders}
                  />
                }
              />
              <Route 
                path="/folder/:folder_id" 
                render={(routerProps) =>
                  <Sidebar
                    folders={this.state.folders}
                    selectedFolder={this.state.folders.find(folder => folder.id === routerProps.match.params.folder_id)}
                  />
                }
              />
              <Route 
                path="/note/:note_id" 
                render={(routerProps) =>
                  <SidebarDetail
                    //Provide info for displaying the folder name in the Sidebar &
                    //note content in the Main section.
                    folders={this.state.folders}
                    note={this.state.notes.find(note => note.id === routerProps.match.params.note_id)}
                  />
                }
              />
            </Switch>
            
        </div>
        <div className="Section">
            <Switch>
              <Route 
                exact path="/" 
                render={(routerProps) =>
                  <Main
                    notes={this.state.notes}
                  />
                }
                />
              <Route 
                path="/folder/:folder_id" 
                render={(routerProps) =>
                  <Main
                    notes={this.state.notes.filter(note => note.folderId === routerProps.match.params.folder_id)}
                  />
                }
              />
              <Route 
                path="/note/:note_id" 
                render={(routerProps) =>
                  <MainDetail
                    note={this.state.notes.find(note => note.id === routerProps.match.params.note_id)}
                  />
                }
              />
            </Switch>

        </div>
      </div>
    </NotesContext.Provider>
  );
} */

}

export default App;




