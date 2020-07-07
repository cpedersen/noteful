import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import NotesContext from './notesContext'
import './sidebar.css'

class Sidebar extends Component {
    
    render() {
        return (
            <NotesContext.Consumer>
                {notesContext => (
                    <div className="Sidebar">
                        {notesContext.folders.map(folder => {
                            return(
                                <div className={(this.props.selectedFolder && this.props.selectedFolder.id === folder.id)? "SelectedFolder": "Folder"}>
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
                )}
            </NotesContext.Consumer>
        );
    }
}

export default Sidebar;

//<div className={props.item.purchased ? 'purchased' : ''}>