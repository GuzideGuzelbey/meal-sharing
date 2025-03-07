import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import mealsRouter from "./routers/meals.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/meals", mealsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`API listening on port ${process.env.PORT || 3000}`);
});
