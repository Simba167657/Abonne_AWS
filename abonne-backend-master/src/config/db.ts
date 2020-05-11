import * as dotenv from "dotenv";
import {Pool, PoolClient, PoolConfig  } from "pg";
import {logger} from "./logger";

dotenv.config();
const poolConfig: PoolConfig = {
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    password: process.env.DBPASSWORD,
    port: 5432,
    user: process.env.DBUSER,
};

export const db: Pool = new Pool(poolConfig);

db.on("error", (err: Error, client: PoolClient ) => {
    logger.error("Database error " +  err + "on client " + client);
    throw(err);
});
