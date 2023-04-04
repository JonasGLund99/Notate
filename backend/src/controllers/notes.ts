import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import note from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    
    try {
        checkValidObjectId(noteId);

        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        res.status(200).json(note);
    } catch(error) {
        next(error);
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
    tag?: string,
    color?: string
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const tag = req.body.tag;
    const color = req.body.color;

    try {
        checkIfNoteHasTitle(title);

        const newNote = await NoteModel.create({
            title: title,
            text: text,
            tag: tag,
            color: color
        });

        res.status(201).json(newNote);

    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
    tag?: string,
    color?: string
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newTag = req.body.tag;
    const newColor = req.body.color;
    
    try {
        checkValidObjectId(noteId);
        checkIfNoteHasTitle(newTitle);
        
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        note.title = newTitle!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        note.text = newText!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        note.tag = newTag!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        note.color = newColor!;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
} 

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        checkValidObjectId(noteId);
        
        const note = await NoteModel.findById(noteId).exec();
        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        await note.deleteOne();

        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
}


// Shorthand for validating object IDs
function checkValidObjectId(noteId: string): void {
    if (!mongoose.isValidObjectId(noteId)) {
        throw createHttpError(400, "Invalid note ID");
    }
}

// Shorthand for checking if a note has a title
function checkIfNoteHasTitle(title: unknown) : void {
    if (!title) {
        throw createHttpError(400, "Note must have a title");
    }
} 
