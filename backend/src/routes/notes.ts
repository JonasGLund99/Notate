import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

// Endpoint for getting all notes
router.get("/", NotesController.getNotes);

// Endpoint for getting a single note
router.get("/:noteId", NotesController.getNote);

// Endpoint for creating a new note
router.post("/", NotesController.createNote);

// Endpoint for updating a note
router.patch("/:noteId", NotesController.updateNote);

//Endpoint for deleting a note
router.delete("/:noteId", NotesController.deleteNote);

export default router;