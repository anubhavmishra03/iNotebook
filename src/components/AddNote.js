import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully", "success")
    }
    const onChange = (e)=> {
        setnote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form>
            <div className="mb-3 my-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} style={{ backgroundColor: "#032c4d", color: "white" }} />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} style={{ backgroundColor: "#032c4d", color: "white" }} />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name='tag' value = {note.tag} onChange={onChange} style={{ backgroundColor: "#032c4d", color: "white" }} />
            </div>
            <button type="submit" disabled={note.title.length<3 ||  note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
