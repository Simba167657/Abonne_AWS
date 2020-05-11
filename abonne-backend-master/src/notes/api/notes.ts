import { Request, Response } from "express";
import { Pool } from "pg";
import { NotesRepository } from "../repository/notes";

export class NotesAPI {
  private notesRepository: NotesRepository;

  constructor(db: Pool) {
    this.notesRepository = new NotesRepository(db);
  }

  async handleAddNote(req: Request, res: Response) {
    try {
      const { note, driver, trip, customer } = req.body;
      await this.notesRepository.createNote(note, driver, trip, customer);
      res.status(200).send({ success: "note created successfully" });
    } catch (error) {
      this, this.sendError(res, error, "error creating note", 400);
    }
  }

  async handleGetNotes(req: Request, res: Response) {
    try {
      const notes = await this.notesRepository.getNotesById(req.query);
      res.status(200).send({ notes });
    } catch (error) {
      this, this.sendError(res, error, "error getting notes", 400);
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
