import { Request, Response } from "express";
import { Pool } from "pg";
import { EmailsRepository } from "../repository/emails";

export class EmailsAPI {
  private emailRepository: EmailsRepository;

  constructor(db: Pool) {
    this.emailRepository = new EmailsRepository(db);
  }

  async handleAddEmail(req: Request, res: Response) {
    try {
      await this.emailRepository.createEmail(req.body.email);
      res.status(200).send({ success: "email received successfully" });
    } catch (error) {
      this, this.sendError(res, error, "error sending email", 400);
    }
  }

  async handleGetAllEmails(req: Request, res: Response) {
    try {
      const emails = await this.emailRepository.getAllEmails();
      res.status(200).send({ emails });
    } catch (error) {
      this, this.sendError(res, error, "error getting emails", 400);
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
