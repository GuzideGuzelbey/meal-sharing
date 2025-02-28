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

// // Future Meals
// apiRouter.get("/future-meals", async (req, res) => {
//   try {
//     const futureMealsQuery =
//       process.env.DB_CLIENT === "mysql2"
//         ? "SELECT * FROM meal WHERE `when` > NOW() ;"
//         : "SHOW TABLES;";
//     const tables = await knex.raw(futureMealsQuery);
//     res.json({ tables });
//   } catch (error) {
//     console.error("DB query failed:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Past Meals
// apiRouter.get("/past-meals", async (req, res) => {
//   try {
//     const pastMealsQuery =
//       process.env.DB_CLIENT === "mysql2"
//         ? "SELECT * FROM meal WHERE `when` < NOW() ;"
//         : "SHOW TABLES;";
//     const tables = await knex.raw(pastMealsQuery);
//     res.json({ tables });
//   } catch (error) {
//     console.error("DB query failed:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // All Meals
// apiRouter.get("/all-meals", async (req, res) => {
//   try {
//     const allMealsQuery =
//       process.env.DB_CLIENT === "mysql2"
//         ? "SELECT * FROM meal;"
//         : "SHOW TABLES;";
//     const tables = await knex.raw(allMealsQuery);
//     res.json({ tables });
//   } catch (error) {
//     console.error("DB query failed:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// This nested router example can also be replaced with your own sub-router
apiRouter.use("/meals", mealsRouter);

app.use("/api", apiRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`API listening on port ${process.env.PORT || 3000}`);
});
