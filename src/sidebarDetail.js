import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
//import { Route, Switch } from 'react-router-dom'
import NotesContext from './notesContext'
import { findNote, findFolder } from './notes-helpers'
import './sidebarDetail.css';

class SidebarDetail extends Component {
    /*static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }*/
    static contextType = NotesContext;
    render() {
        let notesContext = this.context
        let note = notesContext.notes.filter(note => note.id === this.props.match.params.note_id)
        return (
            notesContext.folders.map(folder => {
                if (folder.id === note[0].folderId) {
                    return(
                        <div className="SidebarDetail">
                            <div className="Section_BackButton">
                                <NavLink className="BackButton"
                                    tag='button'
                                    role='link'
                                    to={'/'}>
                                    Back
                                </NavLink>
                            </div>
                            <div className="FolderName">
                                {folder.name}
                            </div>
                        </div>
                    )
                }
            })
        );
    }
}

export default SidebarDetail;