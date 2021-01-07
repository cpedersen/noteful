import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotesContext from '../notesContext'
import './addFolder.css'
import config from '../config'

class AddFolder extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {title: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"title": this.state.title})
        };
        fetch(config.API_ENDPOINT + "/api/folders", requestOptions)
          .then(response => response.json())
          .then(result => {
              //console.log(result);
              this.context.addFolder(result.title, result.id);
              this.props.history.push("/");
            })
          .catch(error => console.log('error', error));
    }

    validateName() {
        return this.context.validateName(this.state.title)
    }

    render() {
        return (
            <div>
                <div className="AddFolder_HeaderBox">
                    <div className="AddFolder_Header_Sidebar">
                        <div className="AddFolder_Section_BackButton">
                            <NavLink className="AddFolder_BackButton"
                                tag='button'
                                role='link'
                                to={'/'}>
                                Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="Header_Main">
                        <h1 className="AddFolder_HeadingText">
                        <Link className="AddFolder_Header_Link" to={'/'}>
                            Noteful
                        </Link></h1>
                    </div>
                </div>

                <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                    <h1 className="AddFolder_Title">Create a folder</h1>
                    <label htmlFor="enterFolderName" className="AddFolder_Label">
                        Folder Name:{' '}
                        <input 
                            type="text" 
                            value={this.state.title}
                            className="NameInput" 
                            title="name" 
                            id="name"  
                            aria-required="true" 
                            aria-labelledby="enterFolderName"
                            aria-invalid="true"
                            onChange={e => this.handleChange(e)}
                        />
                    </label>
                        
                    <input 
                        type="submit" 
                        value="Add Folder"
                        className="AddFolder_SubmitButton"
                        disabled={
                            this.validateName()
                        }
                    />
                </form>
            </div>
        );
    }
}

export default AddFolder;