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

        //Check if we're on the main page by looking at last 5 characters of the url
        /*console.log("url: " + window.location.href)
        let urlCurrent = window.location.href
        urlCurrent = urlCurrent.substr(urlCurrent.length - 5)
        urlCurrent = urlCurrent.substring(0, urlCurrent.length - 1)
        console.log("portNumber: " + urlCurrent)*/

        if (selectedNote.length === 0 ) {
        /*if (selectedNote.length === 0 && urlCurrent === "3000") {*/
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


