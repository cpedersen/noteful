import React, { Component } from 'react'
import NotesContext from './notesContext'
//import { format, parseISO } from 'date-fns'
import './addNote.css'

//TODO:
//- Add menu pick to select folder
//- Generate modified value

class AddNote extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            folderId: '',
            content: "Hello!"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("event: " + event.target.value)
        const value = event.target.value;

        this.setState(
            {[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        //console.log("this.context: " + JSON.stringify(this.context))
        event.preventDefault();
        console.log('Note Name: ', this.state.name);
        console.log('Note Folder Id: ', this.state.folderId);
        console.log('Note Content: ', this.state.content);
        let requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "name": this.state.name,
              "id": this.state.id,
              "folderId": this.state.folderId,
              "modified": new Date().toISOString(),
              "content": this.state.content
            })
        };
        fetch("http://localhost:9090/notes/", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result);
              this.context.addNote(
                  result.name, 
                  result.id, 
                  result.folderId, 
                  result.modified,
                  result.content
                );
              this.props.history.push("/");
            })
          .catch(error => console.log('error', error));
    }

    render() {
        //console.log("Folders: " + JSON.stringify(this.context.folders))
        let notesContext = this.context
        const selectedFolder = this.props.match.params.folder_id || {}

        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h1>Create a note</h1>
                <label>
                    Note Name:{' '}
                    <input 
                        type="text" 
                        value={this.state.name}
                        className="NameInput" 
                        name="name" 
                        id="name"
                        onChange={e => this.handleChange(e)}
                    />
                </label>

                <label>
                    Content:{' '}
                    <textarea
                        className="ContentInput" 
                        name="content" 
                        id="content"  
                        onChange={e => this.handleChange(e)}
                    />
                </label>

                {/*<label>
                    Folder:{' '}
                    <input 
                        type="text" 
                        value={this.state.folderId}
                        className="FolderInput" 
                        name="folderId" 
                        id="folderId"
                        onChange={e => this.handleChange(e)}
                    />
                </label>*/}

                <label>
                    Folder:{' '}
                    <select value={this.state.folderId} onChange={e => this.handleChange(e)}>
                        {notesContext.folders.map(folder => {
                            return(
                                <option value={folder.name} key={folder.id}>{folder.name}</option>
                            )
                        })}
                    </select>
                </label>

                <input 
                    type="submit" 
                    value="Submit"
                    className="SubmitButton"
                />
            </form>
        );
    }
}

export default AddNote;

//defaultValue="b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
//defaultValue="Hello there!"