import {Pool, PoolClient, PoolConfig  } from "pg";

const poolConfig: PoolConfig = {
    database: "abonnetest",
    host: "localhost",
    password: "12345678",
    port: 5432,
    user: "tester",
};

export const db: Pool = new Pool(poolConfig);

db.on("error", (err: Error, client: PoolClient ) => {
    console.error(client);
    throw(err);
});
