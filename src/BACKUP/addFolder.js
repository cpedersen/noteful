import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotesContext from './notesContext'
import './addFolder.css'

class AddFolder extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {name: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //console.log("event: " + event.target.value)
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"name":this.state.name})
        };
        fetch("http://localhost:9090/folders/", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result);
              this.context.addFolder(result.name, result.id);
              this.props.history.push("/");
            })
          .catch(error => console.log('error', error));
    }

    validateName() {
        return this.context.validateName(this.state.name)
    }

    render() {
        return (
            <div>
                <div className="HeaderBox">
                    <div className="Header_Sidebar">
                        <div className="Section_BackButton">
                            <NavLink className="BackButton"
                                tag='button'
                                role='link'
                                to={'/'}>
                                Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="Header_Main">
                        <h1 className="HeadingText">
                        <Link className="Header_Link" to={'/'}>
                            Noteful
                        </Link></h1>
                    </div>
                </div>

                <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                    <h1>Create a folder</h1>
                    <label htmlFor="enterFolderName" className="Label">
                        Folder Name:{' '}
                        <input 
                            type="text" 
                            value={this.state.name}
                            className="NameInput" 
                            name="name" 
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
                        className="SubmitButton_AddFolder"
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