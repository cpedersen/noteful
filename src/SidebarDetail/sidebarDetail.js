import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import NotesContext from '../notesContext'
import './sidebarDetail.css';

class SidebarDetail extends Component {
    static contextType = NotesContext;
    render() {
        let notesContext = this.context.notes
        let note = notesContext.filter(note => note.id === Number(this.props.match.params.note_id))
        let foldersContext = this.context.folders
        return (
            <section className="Section_Sidebar">
            {foldersContext.map(folder => {
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
            })}
            </section>
        );
    }
}

export default withRouter(SidebarDetail);

