import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotesContext from '../notesContext'
import './sidebar.css'

class Sidebar extends Component {
    static contextType = NotesContext
    render() {
        let notesContext = this.context
        const {notes} = notesContext
        const selectedFolder = parseInt(this.props.match.params.folder_id) || {}
        console.log({selectedFolder, notes: notesContext.notes})
        return (
            <section className="Section_Sidebar">
                <div>
                    {notesContext.folders.map(folder => {
                        console.log(folder)
                        const folderNotes = notes.filter(({ folder_id }) => folder_id === folder.id)
                        return(
                            <section key={folder.id} className={(selectedFolder && selectedFolder === folder.id)? "Folder SelectedFolder" : "Folder"}>
                                <NavLink className="Folder_Link" 
                                    tag='button'
                                    role='link'
                                    to={'/api/folder/' + folder.id}>
                                    {folder.title}{" "}
                                    <small>({folderNotes.length || '-'})</small>
                                </NavLink>
                            </section>
                        )
                    })}

                    <section className="AddFolder_Section">
                        <NavLink 
                            className="AddFolder_Button"
                            tag={Link}
                            to={'/api/add-folder'}
                            type='button'
                        >
                            Add Folder
                        </NavLink>
                    </section>
                </div>
            </section>
        );
    }
}

export default Sidebar;