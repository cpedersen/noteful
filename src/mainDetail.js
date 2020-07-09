import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import NotesContext from './notesContext'
import './mainDetail.css';

class MainDetail extends Component {
    static contextType = NotesContext;

    render() {
        let notesContext = this.context
        let note = notesContext.notes.filter(note => note.id === this.props.match.params.note_id)
        console.log("MainDetail note: " + JSON.stringify(note))
        return (
            <section className="MainDetail">
                <div className="MainDetail_Header">
                    <div className="Header_Section1">
                        <div className="NoteTitle">{note[0].name}</div>
                        <div className="Date">
                            Modified {' '} {format(parseISO(note[0].modified), 'MM/dd/yyyy')} 
                        </div>
                    </div>
                    <div className="Header_Section2">
                        <button className="DeleteButton"
                            onClick={() => notesContext.deleteNote(note[0].id)}
                            tag='button'
                            role='link'
                            to={'/'}>
                            Delete
                        </button>
                    </div>
                </div>
            
                <div className="NoteBox">
                    <p className="NoteText">
                    {note[0].content}
                    </p>
                </div>
            </section>
        );
    }
}

export default MainDetail;