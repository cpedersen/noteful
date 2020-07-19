import React, { Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import NotesContext from './notesContext'
import AddFolder from './addFolder'
import './main.css';
import './notes-helpers.js'

class Main extends Component {
    static contextType = NotesContext
    render() {
        let notesContext = this.context
        let notes
        if (this.props.match.params.folder_id) {
            notes = notesContext.notes.filter(note => note.folderId === this.props.match.params.folder_id)
        } else {
            notes = notesContext.notes
        }
        return (
            <section className="Main">
                {notes.map(note => {
                    return(
                        <section key={note.id} className="Note">
                            <div className="Note_Section1">
                                <h3 className="Note_Name"><Link className="Note_Link" to={'/note/' + note.id}>{note.name}</Link></h3>
                            </div>
                            <div className="Note_Section2">
                                <div className="Note_Section2_Date">
                                    Modified {' '} {format(parseISO(note.modified), 'MM/dd/yyyy')} 
                                </div>
                                <div className="Note_Section2_Button">
                                    <button 
                                        onClick={() => notesContext.deleteNote(note.id)}
                                        className="Delete_Note_Button">Delete Note</button>
                                </div>
                            </div>
                        </section>
                    )
                })}
                <section className="AddNote_Button_Section">
                    <NavLink 
                        className="AddNote_Button"
                        tag={Link}
                        to={'/add-note'}
                        type='button'
                    >
                    Add Note 
                    </NavLink>
                </section>
            </section>
            
        );

    }
}

export default withRouter(Main);

