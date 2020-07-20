import React, { Component } from 'react'
import NotesContext from './notesContext'
import './addNote.css'

class AddNote extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
            content: "",
            value: '',
        }
        this.handleChangeOfNote = this.handleChangeOfNote.bind(this);
        this.handleChangeOfFolder = this.handleChangeOfFolder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeOfNote(event) {
        //console.log("handleChange value: " + event.target.value);
        //console.log("handleChange name: " + event.target.name);
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleChangeOfFolder(event) {
        //console.log("handleChange value: " + event.target.value);
        //console.log("handleChange folderId: " + this.state.folderId);
        this.setState(
            {folderId: event.target.value}
        );
    }

    handleSubmit(event) {
        //console.log("this.context: " + JSON.stringify(this.context))
        event.preventDefault();
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
              console.log("result:" + JSON.stringify(result));
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
        let notesContext = this.context
        return (
            <form 
                className="AddNote" 
                onSubmit={e => this.handleSubmit(e)}
            >
                <h1>Create a note</h1>
                <label>
                    Note Name:{' '}
                    <input 
                        type="text" 
                        value={this.state.name}
                        className="NameInput" 
                        name="name" 
                        id="name"
                        onChange={(e) => this.handleChangeOfNote(e)}
                    />
                </label>

                <label>
                    Content:{' '}
                    <textarea
                        className="ContentInput" 
                        name="content" 
                        id="content"  
                        onChange={e => this.handleChangeOfNote(e)}
                    />
                </label>

                <label>
                    Folder:{' '}
                    <select 
                        value={this.state.folderId} onChange={(e) => this.handleChangeOfFolder(e)}>
                        {notesContext.folders.map(folder => {
                            return(
                                <option 
                                    value={folder.id} 
                                    name={folder.name} 
                                    key={folder.id}>{folder.name}
                                </option>
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