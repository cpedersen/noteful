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
            folderId: '',
            content: "",
            value: '',
        }
        this.handleChangeOfNote = this.handleChangeOfNote.bind(this);
        this.handleChangeOfFolder = this.handleChangeOfFolder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeOfNote(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleChangeOfFolder(event) {
        this.setState(
            {folderId: event.target.value}
        );
    }

    handleSubmit(event) {
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

    validateName() {
        return this.context.validateName(this.state.name)
    }

    componentDidMount() {
        if (this.context.folders) {
            this.setState ({
                folderId: this.context.folders[0].id
            });
        }
    }

    render() {
        let notesContext = this.context
        return (
            <form 
                className="AddNote" 
                onSubmit={e => this.handleSubmit(e)}
            >
                <h1>Create a note</h1>
                <section class="InputFields">
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
                                        key={folder.id}>
                                        {folder.name}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    
                </section>
                <input 
                    type="submit" 
                    value="Submit"
                    className="SubmitButton"
                    disabled={
                        this.validateName()
                    }
                />
            </form>
        );
    }
}

export default AddNote;