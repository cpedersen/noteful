import React, { Component } from 'react'
import NotesContext from './notesContext'
import { Link, NavLink } from 'react-router-dom';
import './header.css';

class Header extends Component {
    static contextType = NotesContext;
    render() {
        let notesContext = this.context
        let selectedNote = []
        selectedNote = notesContext.notes.filter(note => note.id === this.props.match.params.note_id)

        /*console.log("url: " + window.location.href)
        let urlCurrent_Orig = window.location.href
        let urlCurrent = urlCurrent_Orig.substr(urlCurrent_Orig.length - 5)
        urlCurrent = urlCurrent_Orig.substring(0, urlCurrent_Orig.length - 1)
        console.log("urlCurrent: " + urlCurrent)

        let selectedFolder = urlCurrent_Orig.search("/folder/")
        console.log("selectedFolder: " + selectedFolder)*/

        if (selectedNote.length === 0) {
            return( 
                <div className="HeaderBox">
                    <div className="Header_Sidebar"></div>
                    <div className="Header_Main">
                        <h1 className="HeadingText">
                        <Link className="Header_Link" to={'/'}>
                            Noteful
                        </Link></h1>
                    </div>
                </div>
            );
        } else {
            return( 
                <div className="HeaderBox_WithNote">
                    <div className="Header_Sidebar_WithNote">
                        <div className="Section_BackButton">
                            <NavLink className="BackButton"
                                tag='button'
                                role='link'
                                to={'/'}>
                                Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="Header_Main_WithNote">
                        <h1 className="HeadingText">
                        <Link className="Header_Link" to={'/'}>
                            Noteful
                        </Link></h1>
                    </div>
                </div>
            );
        }
    }
}

export default Header;


