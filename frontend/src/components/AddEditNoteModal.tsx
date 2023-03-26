import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { useForm } from "react-hook-form";

interface AddEditNoteModalProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void,
}

const AddEditNoteModal = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteModalProps) => {
    const { register, handleSubmit, formState : {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse : Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error)
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    { noteToEdit? "Edit note" : "Add note" } 
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        isInvalid={!!errors.title}
                        {...register("title", { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        rows={5}
                        placeholder="Enter description"
                        {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                type="submit"
                form="addEditNoteForm"
                disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddEditNoteModal;