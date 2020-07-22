import React, { Component } from 'react'
import NotesContext from './notesContext'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    static contextType = NotesContext

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2 className="ErrorBoundary">Something went wrong.</h2>
            );
        }
        return this.props.children; 
    }
}

export default ErrorBoundary;