import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import NotesContext from '../notesContext'
import './sidebarDetail.css';

class SidebarDetail extends Component {
    static contextType = NotesContext;
    render() {
        let notesContext = this.context.notes
        let note = notesContext.filter(note => note.id == this.props.match.params.note_id)
        let foldersContext = this.context.folders
        return (
            foldersContext.map(folder => {
                if (folder.id === note[0].folder_id) {
                    return(
                        <div key={folder.id} className="SidebarDetail">
                            <div className="FolderName">
                                {folder.title}
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

export default withRouter(SidebarDetail);

