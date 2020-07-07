import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import NotesContext from './notesContext'
import './main.css';

//Modified {' '} {format(note.modified, 'MM/DD/YYYY')} 
//Modified {' '} {note.modified}

class Main extends Component {
    render() {
        return (
            <NotesContext.Consumer>
                {notesContext => (
                    <div className="Main">
                        {notesContext.notes.map(note => {
                            return(
                                <div className="Note">
                                    <div className="Note_Section1">
                                        <h3 className="Note_Name"><Link className="Note_Link" to={'/note/' + note.id}>{note.name}</Link></h3>
                                    </div>
                                    <div className="Note_Section2">
                                        <div className="Note_Section2_Date">
                                            Modified {' '} {format(parseISO(note.modified), 'MM/dd/yyyy')} 
                                        </div>
                                        <div className="Note_Section2_Button">
                                            <button className="Delete_Note_Button">Delete Note</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="Add_Note_Button_Section">
                            <button 
                                className="Add_Note_Button"
                                tag={Link}
                                to='/add-note'
                                type='button'
                            >
                            Add Note 
                            </button>
                        </div>
            </div>
            )}
            </NotesContext.Consumer>
        );
    }
}

export default Main;