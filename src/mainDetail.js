import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import './mainDetail.css';

//Modified {' '} {format(this.props.note.modified, 'MM/DD/YYYY')} 
//Modified {' '} {this.props.note.modified}

class MainDetail extends Component {
    render() {
        return (
            <div className="MainDetail">
                <div className="MainDetail_Header">
                    <div className="Header_Section1">
                        <div className="NoteTitle">{this.props.note.name}</div>
                        <div className="Date">
                            Modified {' '} {format(parseISO(this.props.note.modified), 'MM/dd/yyyy')}
                        </div>
                    </div>
                    <div className="Header_Section2">
                        <button className="DeleteButton"
                            tag='button'
                            role='link'
                            to={'/'}>
                            Delete
                        </button>
                    </div>
                </div>
            
            
            <div className="NoteBox">
                <p className="NoteText">
                {this.props.note.content}
                </p>
            </div>
        </div>
        );
    }
}

export default MainDetail;