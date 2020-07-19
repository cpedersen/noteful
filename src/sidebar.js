import React, { Component } from 'react'
import { NavLink, Route, Link } from 'react-router-dom'
import NotesContext from './notesContext'
import AddFolder from './addFolder'
import './sidebar.css'

class Sidebar extends Component {
    static contextType = NotesContext
    render() {
        let notesContext = this.context
        const selectedFolder = this.props.match.params.folder_id || {}
        return (
            <section className="Sidebar">
                {notesContext.folders.map(folder => {
                    return(
                        <section key={folder.id} className={(selectedFolder && selectedFolder === folder.id)? "SelectedFolder": "Folder"}>
                            <NavLink className="Folder_Link" 
                                tag='button'
                                role='link'
                                to={'/folder/' + folder.id}>
                                {folder.name}
                            </NavLink>
                        </section>
                    )
                })}

                <section className="AddFolder_Section">
                    <NavLink 
                        className="AddFolder_Button"
                        tag={Link}
                        to={'/add-folder'}
                        type='button'
                    >
                        Add Folder
                    </NavLink>
                    
                </section>
            </section>


        );
    }
}

export default Sidebar;



/*
render={() => {
    return <AddFolder/>
}}
*/

/*
<Route
path='/add-folder'
render={() => <h1>TESTING</h1> }
/>
*/

//target="_blank"
//onClick={AddFolder}

//<FontAwesomeIcon icon='plus' />

/*
<Route
path='/add-folder'
component={AddFolder}
/>  
*/

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'

/*
                    <Route
                        path='/add-folder'
                        render={(props) => 
                            <AddFolder
                                {...props}
                            />    
                        }
                    />  
*/