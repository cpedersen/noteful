import React, { Component } from 'react'
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
        console.log("event: " + event.target.value)
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Folder Name: ', this.state.name);
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
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h1>Create a folder</h1>
                <label>
                    Folder Name:{' '}
                    <input 
                        type="text" 
                        value={this.state.name}
                        className="NameInput" 
                        name="name" 
                        id="name"  
                        onChange={e => this.handleChange(e)}
                    />
                </label>
                    
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

export default AddFolder;