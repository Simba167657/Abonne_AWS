import { Request, Response } from "express";
import { Pool } from "pg";
import * as validator from "validator";
import { Auth } from "./../../middleware/auth";
import { AdminRepository } from "./../repo/admin";

export class AdminAPI {
  private adminRepo: AdminRepository;
  private auth: Auth;

  constructor(db: Pool) {
    this.adminRepo = new AdminRepository(db);
    this.auth = new Auth();
  }

  async handleCreateAdmin(req: Request, res: Response): Promise<void> {
    const validationErrors: string[] = [];
    if (!req.body.username || validator.default.isEmpty(req.body.username)) {
      validationErrors.push("username is required");
    }
    if (!req.body.password || validator.default.isEmpty(req.body.password)) {
      validationErrors.push("password is required");
    }
    if (!req.body.name || validator.default.isEmpty(req.body.name)) {
      validationErrors.push("name is required");
    }
    if (!req.body.mobileNumber || validator.default.isEmpty(req.body.mobileNumber)) {
      validationErrors.push("mobile number is required");
    }
    if (validationErrors.length) {
      res.status(400).send({ errors: validationErrors });
      return;
    }

    try {
      const { username, password, name, mobileNumber } = req.body;
      const hash = await this.auth.generateHashFromPassword(password);
      await this.adminRepo.createAdmin(username, hash, name, mobileNumber);
      res.status(201).send({ success: "admin created successfully" });
    } catch (error) {
      this.sendError(res, error, "username is taken, please use another one", 400);
    }
  }

  async handleUpdateAdmin(req: Request, res: Response) {
    try {
      await this.adminRepo.updateAdminByID(req.params.id, req.body);
      res.status(200).send({ success: "admin updated successfully" });
    } catch (error) {
      this.sendError(res, error, "error getting admins", 400);
    }
  }

  async handleGetAllAdmins(req: Request, res: Response): Promise<void> {
    try {
      const admins = await this.adminRepo.getAllAdmins();
      res.status(200).send(admins);
    } catch (error) {
      this.sendError(res, error, "error getting admins", 400);
    }
  }

  async handleLogin(req: Request, res: Response): Promise<void> {
    const validationErrors: string[] = [];
    if (!req.body.username || validator.default.isEmpty(req.body.username)) {
      validationErrors.push("username is required");
    }
    if (!req.body.password || validator.default.isEmpty(req.body.password)) {
      validationErrors.push("password is required");
    }
    if (validationErrors.length) {
      res.status(400).send({ errors: validationErrors });
    } else {
      try {
        const token = await this.adminRepo.login(req.body.username, req.body.password);
        res.status(200).send(token);
      } catch (error) {
        this.sendError(res, error, "invalid username or password", 400);
      }
    }
  }

  private sendError(res: Response, err: Error, message: string, code: number) {
    res.status(code).send({
      error: err.message,
      message
    });
  }
}
