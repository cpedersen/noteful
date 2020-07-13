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
        if (selectedNote.length === 0) {
            console.log("Didn't find selectedNote: " + selectedNote)
            return( 
                <div className="Header">
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
            console.log("Found selectedNote: " + selectedNote)
            return( 
                <div className="Header">
                    <div className="Header_Sidebar"></div>
                        <div className="Section_BackButton">
                            <NavLink className="BackButton"
                                tag='button'
                                role='link's
                                to={'/'}>
                                Back
                            </NavLink>
                        </div>
                    <div className="Header_Main">
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

/*function Header () {
    return (
        <div className="Header">
            <div className="Header_Sidebar"></div>
            <div className="Header_Main">
                <h1 className="HeadingText">
                <Link className="Header_Link" to={'/'}>
                    Noteful
                </Link></h1>
            </div>
        </div>
    );
}*/
