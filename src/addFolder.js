import React, { Component } from 'react'
import NotesContext from './notesContext'
import './addFolder.css';

class AddFolder extends Component {
    //TODO - use createRef?
    /*constructor(props) {
        super(props);
        this.nameInput = React.createRef();
    }*/

    constructor(props) {
        super(props);
        this.state = {name: ''}
        /*this.state = {
            name: {
                value: '',
                touched: false
            }
        }*/

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //ref={this.nameInput} 

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
        //const name = event.target.nameFolder.value;
        //const { name } = this.state;

        //console.log('Folder Name: ', name);
        //TODO - submit these values to the server here
    }

    /*addName(name) {
        this.setState({name: {value: name, touched: true}});
    }*/

    render() {
        console.log("Made it inside addFolder render");
        return (
            <form className="AddFolder" onSubmit={e => this.handleSubmit(e)}>
                <h1>Create a folder</h1>
                <label>
                    Folder Name: 
                    <input 
                        type="text" 
                        value={this.state.name}
                        className="FolderNameInput" 
                        name="name" 
                        id="name"  
                        onChange={e => this.handleChange(e.target.name)}
                    />
                </label>
                    {this.state.name.touched}
                <input 
                    type="submit" 
                    value="Submit"
                    className="SubmitButton"
                />
            </form>
        );
    }
}

export default AddFolder;