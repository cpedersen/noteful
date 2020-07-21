import React, { Component } from 'react'
//import { NavLink, Link } from 'react-router-dom'
import NotesContext from './notesContext'
//import './errorBoundary.css'

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
    
    /*componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
    }*/

    render() {
        if (this.state.hasError) {
            return (
                <h1 className="ErrorBoundary">Something went wrong.</h1>
            );
        }
    }
}

export default ErrorBoundary;