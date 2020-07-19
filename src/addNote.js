import React, { Component } from 'react'
import NotesContext from './notesContext'
import './addNote.css'

class AddNote extends Component {
    static contextType = NotesContext
    constructor(props) {
        super(props);
        this.state = {name: ''}
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
        let requestOptions = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"name":this.state.name})
        };
        fetch("http://localhost:9090/notes/", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result);
              this.context.addFolder(result.name, result.id)
            })
          .catch(error => console.log('error', error));
    }

    render() {
        console.log("Made it inside addNote render");
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
                    {this.state.name}
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