import React, {useContext} from "react";
import noteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
        <div className="card my-3 " style={{ backgroundColor: "#032c4d", color: "white" }}>
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa fa-trash-o mx-2" aria-hidden="true" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
                <i className="fa-solid fa-pen-to-square  mx-2" onClick={()=> {updateNote(note)}}></i>
            </div>
            <p className="card-text">{note.description}</p>
        </div>
        </div>
    </div>
  );
};

export default NoteItem;
