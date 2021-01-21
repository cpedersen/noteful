import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotesContext from './notesContext'
import './sidebar.css'
import PropTypes from 'prop-types'

class Sidebar extends Component {
    static contextType = NotesContext
    render() {
        let notesContext = this.context
        const selectedFolder = this.props.match.params.folder_id || {}
        return (
            <section className="Sidebar">
                {notesContext.folders.map(folder => {
                    return(
                        <section key={folder.id} className={(selectedFolder && selectedFolder === folder.id)? "SelectedFolder": "Folder"}>
                            <NavLink className="Folder_Link" 
                                tag='button'
                                role='link'
                                to={'/folder/' + folder.id}>
                                {folder.name}
                            </NavLink>
                        </section>
                    )
                })}

                <section className="AddFolder_Section">
                    <NavLink 
                        className="AddFolder_Button"
                        tag={Link}
                        to={'/add-folder'}
                        type='button'
                    >
                        Add Folder
                    </NavLink>
                    
                </section>
            </section>


        );
    }
}

Sidebar.propTypes = {
	folder_id: PropTypes.number
}

export default Sidebar;