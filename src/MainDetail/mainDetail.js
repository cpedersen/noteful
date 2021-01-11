import React, { Component } from 'react'
import { format, parseISO } from 'date-fns'
import NotesContext from '../notesContext'
import { withRouter } from 'react-router-dom'
import './mainDetail.css';

class MainDetail extends Component {
    static contextType = NotesContext;
    render() {
        let notesContext = this.context
        let selectedNote = notesContext.notes.find(note => note.id === Number(this.props.match.params.note_id)) || {};
        return (
            <section className="MainDetail">
                <div className="MainDetail_Header">
                    <div className="Header_Section1">
                        <div className="NoteTitle">{selectedNote.title}</div>
                        <div className="Date">
                            Modified {' '} {selectedNote.date_modified && format(parseISO(selectedNote.date_modified), 'MM/dd/yyyy')} 
                        </div>
                    </div>
                    <div className="Header_Section2">
                        <button className="DeleteButton"
                            onClick={() => {
                                    notesContext.deleteNote(selectedNote.id);
                                    this.props.history.push('/');
                                }
                            }
                            tag='button'
                            role='link'
                            to={'/'}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="NoteBox">
                    <p className="NoteText">
                    {selectedNote.content}
                    </p>
                </div>
            </section>
        );
    }
}

export default withRouter(MainDetail);
