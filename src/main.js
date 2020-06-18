import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import './main.css';

class Main extends Component {
    render() {
        //const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        //let convertedDate = date.toLocaleDateString('en-US', options)
        return (
            <div className="Main">
                {this.props.notes.map(note => {
                    return(
                        <div className="Note">


                            <div className="Note_Section1">
                                <h3 className="Note_Name"><Link className="Note_Link" to={'/note/' + note.id}>{note.name}</Link></h3>
                            </div>


                            <div className="Note_Section2">
                                <div className="Note_Section2_Date">
                                    Modified {note.modified}
                                </div>
                                <div className="Note_Section2_Button">
                                    <button className="Delete_Note_Button">Delete Note</button>
                                </div>
                            </div>

                        </div>
                    )
                })}

                <div className="Add_Note_Button_Section">
                    <button className="Add_Note_Button">Add Note</button>
                </div>
            </div>
        );
    }
}

export default Main;