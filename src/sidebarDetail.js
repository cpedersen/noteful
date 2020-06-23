import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import './sidebarDetail.css';

class SidebarDetail extends Component {
    render() {
        return (
            this.props.folders.map(folder => {
                if (folder.id === this.props.note.folderId) {
                    return(<div>
                        {folder.name}
                    </div>)
                }
            })
        );
    }
}

export default SidebarDetail;