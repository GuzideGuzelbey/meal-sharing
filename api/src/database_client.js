import "dotenv/config";
import knex from "knex";

const database = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
  pool: { min: 2, max: 10 },
});

database
  .raw("SELECT 1")
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.error("! /Failed to connect to MySQL:", err);
    process.exit(1);
  });
export default database;
