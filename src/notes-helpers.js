export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
  notes.find(note => note.id === noteId)

//export const notes = notesContext.notes.filter(note => note.folderId === this.props.match.params.folder_id)