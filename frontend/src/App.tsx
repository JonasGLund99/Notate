import React, { useEffect, useState } from 'react';
// import logo from './Notate-blue-rounded.svg';
import { Note as NoteModel } from './models/note';
import Note from './components/note';

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);

    useEffect(() => {
        async function loadNotes() {
            try {
                const response = await fetch("/api/notes", { method: "GET" });
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadNotes();
    }, []);

    return (
        <div>
            {notes.map(note => (
                <Note note={note} key={note._id}/>
            ))}
        </div>
    );
}

export default App;
