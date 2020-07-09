import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import NotesContext from './notesContext'
import './main.css';
//import { queryHelpers } from '@testing-library/react'
import './notes-helpers.js'

class Main extends Component {
    static contextType = NotesContext
    render() {
        //console.log("Made it to Main: " + JSON.stringify(this.props))
        let notesContext = this.context
        console.log("main notes: " + JSON.stringify(notesContext.notes))
        let notes
        if (this.props.match.params.folder_id) {
            notes = notesContext.notes.filter(note => note.folderId === this.props.match.params.folder_id)
        } else {
            notes = notesContext.notes
        }
        //QUESTIONS - Not sure why I need to do the selectedFolder check. And do I only need to do this check in Main?
        // How fix no display of all folders by default?
        const selectedFolder = this.props.match.params.folder_id || {}
        //console.log("main selectedFolder: " + JSON.stringify(selectedFolder))
        return (
            <div className="Main">
                {notes.map(note => {
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
                                    <button 
                                        onClick={() => notesContext.deleteNote(note.id)}
                                        className="Delete_Note_Button">Delete Note</button>
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
        );

    }
}

export default withRouter(Main);