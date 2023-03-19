import React, { useEffect, useState } from 'react';
// import logo from './Notate-blue-rounded.svg';
import { Note as NoteModel } from './models/note';
import Note from './components/note';
import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles/NotesPage.module.css';

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
        <Container>
            <Row xs={1} md={2} xl={3} className="g-4">
                {notes.map(note => (
                    <Col key={note._id}>
                        <Note note={note} className={styles.note}/>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default App;
