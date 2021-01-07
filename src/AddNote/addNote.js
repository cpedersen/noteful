import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import NotesContext from '../notesContext'
import config from '../config'
import './addNote.css'

class AddNote extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            id: '',
            folder_id: '',
            content: "",
            value: '',
        }
        this.handleChangeOfNote = this.handleChangeOfNote.bind(this);
        this.handleChangeOfFolder = this.handleChangeOfFolder.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeOfNote(event) {
        this.setState(
            {title: event.target.value}
        );
    }

    handleChangeOfFolder(event) {
        this.setState(
            {folder_id: event.target.value}
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
              "title": this.state.title,
              "id": this.state.id,
              "folder_id": this.state.folder_id,
              "date_modified": new Date().toISOString(),
              "content": this.state.content
            })
        };
        fetch(config.API_ENDPOINT + "/api/notes", requestOptions)
          .then(response => response.json())
          .then(result => {
              this.context.addNote(
                  result.title, 
                  result.id, 
                  result.folder_id, 
                  result.date_modified,
                  result.content
                );
              this.props.history.push("/");
            })
          .catch(error => console.log('error', error));
    }

    validateName() {
        return this.context.validateName(this.state.title)
    }

    //Automatically set the folder to the first listed
    componentDidMount() {
        let foldersContext = this.context.folders        
        if (foldersContext) {
            this.setState ({
                folder_id: foldersContext[0].id
            })
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
                                value={this.state.title}
                                className="NameInput" 
                                title="name" 
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
                                title="content" 
                                id="content"  
                                aria-required="false" 
                                aria-labelledby="enterContent"
                                onChange={e => this.handleChangeOfNote(e)}
                            />
                        </label>

                        <label htmlFor="selectFolder" className="AddNote_Label">
                            Folder:{' '}
                            <select className="SelectFolder"
                                value={this.state.folder_id} onChange={(e) => this.handleChangeOfFolder(e)}>
                                {notesContext.folders.map(folder => {
                                    return(
                                        <option 
                                            //aria-required="false" 
                                            aria-labelledby="selectFolder"
                                            value={folder.id} 
                                            name={folder.title} 
                                            key={folder.id}>
                                            {folder.title}
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