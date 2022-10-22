import { React, useState } from 'react'
import Noteitem from './Noteitem'

const Note = () => {
    let initalnote = [
    ]
    const [notes, setNotes] = useState(initalnote)

    const Addnote = (title, desc) => {

        let note;
        note.title = title;
        note.description = desc;
        notes.concat(note);
        setNotes(notes);
    }
    return (

        <div className="row">
            <h2 className='mb-3'>Your Notes</h2>
            {
                notes.map((elem, i) => {
                    // console.log("here");
                    return <Noteitem key={i} title={elem.title} description={elem.description} Addnote={Addnote} />
                })
            }
        </div>
    )
}

export default Note;