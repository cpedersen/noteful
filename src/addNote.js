import React, { Component } from 'react'
import NotesContext from './notesContext'
import './addNote.css'

class AddNote extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {
            name: 'Cows',
            id: '',
            folderId: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
            modified: '2019-01-03T00:00:00.000Z',
            content: "Hello!"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("event: " + event.target.value)
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
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
              "modified": this.state.modified,
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
                  result.content, 
                  result.modified
                );
              this.props.history.push("/");
            })
          .catch(error => console.log('error', error));
    }

    render() {
        return (
            <form className="AddNote" onSubmit={e => this.handleSubmit(e)}>
                <h1>Create a note</h1>
                <label>
                    Name:{' '}
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
                    <input 
                        type="text" 
                        value={this.state.content}
                        className="ContentInput" 
                        name="content" 
                        id="content"  
                        onChange={e => this.handleChange(e)}
                    />
                </label>

                <label>
                    Folder:{' '}
                    <input 
                        type="text" 
                        value={this.state.folderId}
                        className="FolderInput" 
                        name="folderId" 
                        id="folderId"
                        onChange={e => this.handleChange(e)}
                    />
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