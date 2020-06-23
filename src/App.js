import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header.js'
import Main from './main.js'
import MainDetail from './mainDetail.js'
import Sidebar from './sidebar.js'
import SidebarDetail from './sidebarDetail.js'
import Store from './dummy-store.js'
import './App.css'

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
                    //Provide info for displaying the folder name
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
    );
    
  }
}

export default App;


