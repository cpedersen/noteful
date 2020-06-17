import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

class Sidebar extends Component {
    
    render() {
        return (
            <div className="Sidebar">
                {this.props.folders.map(folder => {
                    return(<div className="Folder">
                            <Link className="Folder_Link" to={'/folder/' + folder.id}>
                                {folder.name}
                            </Link>
                        </div>)
                })}
                <div className="AddFolder_Section">
                    <button className="AddFolder">Add Folder</button>
                </div>
            </div>

        );
    }
}

export default Sidebar;