import React, { Component } from 'react'
//import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { NavLink, withRouter } from 'react-router-dom'
import NotesContext from './notesContext'
import './sidebar.css'

class Sidebar extends Component {
    static contextType = NotesContext
    render() {
        //console.log("Made it to Sidebar: " + JSON.stringify(this.props))
        let notesContext = this.context
        let notes = notesContext.notes.filter(note => note.folderId === this.props.match.params.folder_id)
        const selectedFolder = this.props.match.params.folder_id || {}
        //console.log("selectedFolder: " + selectedFolder)
        //In main check to see if selectedFolder exists (or specify Undefined if it doesn't exist?)
        //const selectedFolder = this.props.match.params.folder_id || {}
        return (
            <div className="Sidebar">
                {notesContext.folders.map(folder => {
                    //console.log("selectedFolder: " + selectedFolder, folder.id)
                    return(
                        <div className={(selectedFolder && selectedFolder === folder.id)? "SelectedFolder": "Folder"}>
                            <NavLink className="Folder_Link" 
                                tag='button'
                                role='link'
                                to={'/folder/' + folder.id}>
                                {folder.name}
                            </NavLink>
                        </div>
                    )
                })}
                <div className="AddFolder_Section">
                    <button className="AddFolder">Add Folder</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);

//<div className={(this.props.selectedFolder && this.props.selectedFolder.id === folder.id)? "SelectedFolder": "Folder"}>

//<NotesContext.Consumer>
//{notesContext => (
//)}
//</NotesContext.Consumer>