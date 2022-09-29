import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/Main.css'
import { toInteger } from 'lodash'

function Notes(props) {

  const [newNote, setNewNote] = useState('')

  function handleChange(event) {
    setNewNote(event.target.value)
  }

  function addNote(){
    axios.post(`https://anakost-server.herokuapp.com/api/notes/add/${props.user}`, {note : newNote});
    props.updateNotes(prevNote => {
      return [...prevNote, {note : newNote}]
    })
    setNewNote('');
  }

  function deleteNote(event){
    axios.post(`https://anakost-server.herokuapp.com/api/notes/delete/${props.user}`, {noteId : event.target.value});
    props.updateNotes(prevNote => {
      return prevNote.filter((item, index) => {
        return index !== toInteger(event.target.value)
      })
    });
  }

  function Notes(props){
    return (
          <div >
            <input onClick={deleteNote} type="checkbox" name='checkbox' value={props.id}></input>
            <p className='sentence'>{props.userNote}</p>
          </div>
    )
  }

  return (
    <div className='notes'>
      <h4>Notes:</h4>

      <div className='note-container'>
        <div className='note'>
          {props.notes.map((note, id) => <Notes key={id} id={id} userNote={note.note}></Notes>)}
        </div>
        
        <div className='noteInput'>
          <input onChange={handleChange} placeholder='ex. Beli Telor' value={newNote}></input>
          <button onClick={addNote}>Add</button>
        </div>
      </div>
      
    </div>
  )
}

export default Notes
