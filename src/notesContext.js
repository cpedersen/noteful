import React from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  //addNote: () => {},
  deleteNote: () => {},
  addFolder: () => {}
})

export default NotesContext;