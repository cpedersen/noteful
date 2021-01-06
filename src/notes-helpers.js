//import { findByPlaceholderText } from "@testing-library/react"

/*export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)*/


export const findFolder = (folders=[], folder_id) =>
  folders.find(folder => folder.id === folder_id)

export const findNote = (notes=[], note_id) =>
  notes.find(note => note.id === note_id)



//export const notes = notesContext.notes.filter(note => note.folderId === this.props.match.params.folder_id)