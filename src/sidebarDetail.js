import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import './sidebarDetail.css';

class SidebarDetail extends Component {
    render() {
        return (
            this.props.folders.map(folder => {
                if (folder.id === this.props.note.folderId) {
                    return(
                        <div className="SidebarDetail">
                            <div className="Section_BackButton">
                                <NavLink className="BackButton"
                                    tag='button'
                                    role='link'
                                    to={'/'}>
                                    Back
                                </NavLink>
                            </div>

                            <div className="FolderName">
                                {folder.name}
                            </div>
                        </div>
                    )
                }
            })
        );
    }
}

export default SidebarDetail;