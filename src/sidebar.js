import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom';
import './sidebar.css';

class Sidebar extends Component {
    
    render() {
        return (
            <div className="Sidebar">
                {this.props.folders.map(folder => {
                    return(
                        <div className={(this.props.selectedFolder && this.props.selectedFolder.id === folder.id)? "SelectedFolder": "Folder"}>
                            <NavLink className="Folder_Link" 
                                tag='button'
                                role='link'
                                to={'/folder/' + folder.id}>
                                {folder.name}
                            </NavLink>
                        </div>
                    )
                })}
                <div className="AddFolder_Section">
                    <button className="AddFolder">Add Folder</button>
                </div>
            </div>

        );
    }
}

export default Sidebar;

//<div className={props.item.purchased ? 'purchased' : ''}>