import { compare, hash } from "bcryptjs";
import { NextFunction, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { db } from "../config/db";

export class Auth {
  createToken(id: number, name: string, username: string, role: string): { token: string } {
    const payload: IPayload = { id, name, username, role };
    const token = sign(payload, process.env.TOKEN_SECRET!, { expiresIn: "30d" });
    return { token };
  }

  async isAuthenticated(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        throw new Error();
      }

      const payload = verify(token, process.env.TOKEN_SECRET!) as IPayload;
      req.user = payload;
      const client = await db.connect();
      const queryText = `SELECT enabled FROM admins WHERE id = ${payload.id}`;
      const result = await client.query(queryText);
      if (result.rows[0].enabled) {
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      res.sendStatus(401);
    }
  }

  async generateHashFromPassword(password: string) {
    return await hash(password, 8);
  }

  async validPassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}

export interface IPayload {
  readonly id: number;
  readonly name: string;
  readonly username: string;
  readonly role: string;
}
