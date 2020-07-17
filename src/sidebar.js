import React, { Component } from 'react'
import { NavLink, withRouter, Route } from 'react-router-dom'
import NotesContext from './notesContext'
import AddFolder from './addFolder'
import './sidebar.css'

class Sidebar extends Component {
    static contextType = NotesContext

    render() {
        let notesContext = this.context
        const selectedFolder = this.props.match.params.folder_id || {}
        return (
            <div className="Sidebar">
                {notesContext.folders.map(folder => {
                    return(
                        <div key={folder.id} className={(selectedFolder && selectedFolder === folder.id)? "SelectedFolder": "Folder"}>
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
                    <NavLink 
                        className="AddFolder_Button"
                        tag='button'
                        role='link'
                        to={'/newfolder'}
                    >
                        <Route
                            path='/add-folder'
                            render={({folder}) => {
                                return <AddFolder/>
                            }}
                        />
                        Add Folder
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(Sidebar);

