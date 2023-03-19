import express from "express";
import * as NotesController from "../controllers/notes";

const router = express.Router();

// Endpoint for getting all notes
router.get("/", NotesController.getNotes);

// Endpoint for getting a single note
router.get("/:noteId", NotesController.getNote);

// Endpoint for creating a new note
router.post("/", NotesController.createNote);

export default router;