import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
            <div>
                <div className="AddNote_HeaderBox">
                    <div className="AddNote_Header_Sidebar">
                        <div className="AddNote_Section_BackButton">
                            <NavLink className="AddNote_BackButton"
                                tag='button'
                                role='link'
                                to={'/'}>
                                Back
                            </NavLink>
                        </div>
                    </div>
                    <div className="AddNote_Header_Main">
                        <h1 className="AddNote_HeadingText">
                        <Link className="AddNote_Header_Link" to={'/'}>
                            Noteful
                        </Link></h1>
                    </div>
                </div>

                <form 
                    className="AddNote" 
                    onSubmit={e => this.handleSubmit(e)}
                >
                    <h1 className="NoteTitle">Create a note</h1>
                    <section className="InputFields">
                        <label htmlFor="enterNoteName" className="Label">
                            Note Name:{' '}
                            <input 
                                type="text" 
                                value={this.state.name}
                                className="NameInput" 
                                name="name" 
                                id="name"
                                aria-required="true" 
                                aria-labelledby="enterNoteName"
                                aria-invalid="true"
                                onChange={(e) => this.handleChangeOfNote(e)}
                            />
                        </label>

                        <label htmlFor="enterContent" className="Label">
                            Content:{' '}
                            <textarea
                                className="ContentInput" 
                                name="content" 
                                id="content"  
                                aria-required="false" 
                                aria-labelledby="enterContent"
                                onChange={e => this.handleChangeOfNote(e)}
                            />
                        </label>

                        <label htmlFor="selectFolder" className="AddNote_Label">
                            Folder:{' '}
                            <select className="SelectFolder"
                                value={this.state.folderId} onChange={(e) => this.handleChangeOfFolder(e)}>
                                {notesContext.folders.map(folder => {
                                    return(
                                        <option 
                                            //aria-required="false" 
                                            aria-labelledby="selectFolder"
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
                        value="Add Note"
                        className="AddNote_SubmitButton"
                        disabled={
                            this.validateName()
                        }
                    />
                </form>
            </div>
        );
    }
}

export default AddNote;