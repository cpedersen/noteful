import React from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  addNote: () => {},
  deleteNote: () => {},
  addFolder: () => {},
  validateName: () => {}
})

export default NotesContext;