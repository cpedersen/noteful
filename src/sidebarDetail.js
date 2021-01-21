import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import NotesContext from './notesContext'
import './sidebarDetail.css'
import PropTypes from 'prop-types'

class SidebarDetail extends Component {
    static contextType = NotesContext;
    render() {
        let notesContext = this.context
        let note = notesContext.notes.filter(note => note.id === this.props.match.params.note_id)
        return (
            notesContext.folders.map(folder => {
                if (folder.id === note[0].folderId) {
                    return(
                        <div key={folder.id} className="SidebarDetail">
                            <div className="FolderName">
                                {folder.name}
                            </div>
                        </div>
                    )
                } else {
                    return(
                        <div key={folder.id}></div>
                    )
                }
            })
        );
    }
}

SidebarDetail.propTypes = {
	note_id: PropTypes.number
}

export default withRouter(SidebarDetail);

