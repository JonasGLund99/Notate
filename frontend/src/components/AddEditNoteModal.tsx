import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { RegisterOptions, UseFormRegisterReturn, useForm } from "react-hook-form";
import TextInputField from "./form/TextInputField";

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
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Enter title" 
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}        
                    />
                    
                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Enter text"
                        register={register}
                    />
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