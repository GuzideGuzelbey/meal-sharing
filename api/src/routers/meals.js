import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Future Meals
mealsRouter.get("/future-meals", async (req, res) => {
  try {
    const futureMealsQuery = "SELECT * FROM meal WHERE `when` > NOW() ;";
    const tables = await knex.raw(futureMealsQuery);
    res.json({ tables });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Past Meals

mealsRouter.get("/past-meals", async (req, res) => {
  try {
    const pastMealsQuery =
      process.env.DB_CLIENT === "mysql2"
        ? "SELECT * FROM meal WHERE `when` < NOW() ;"
        : "SHOW TABLES;";
    const tables = await knex.raw(pastMealsQuery);
    res.json({ tables });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// All Meals
mealsRouter.get("/all-meals", async (req, res) => {
  try {
    const allMealsQuery =
      process.env.DB_CLIENT === "mysql2"
        ? "SELECT * FROM meal;"
        : "SHOW TABLES;";
    const tables = await knex.raw(allMealsQuery);
    res.json({ tables });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//First Meal
mealsRouter.get("/first-meal", async (req, res) => {
  try {
    const firstMealQuery =
      process.env.DB_CLIENT === "mysql2"
        ? "SELECT * FROM meal ORDER BY id ASC LIMIT 1;"
        : "SHOW TABLES;";
    const tables = await knex.raw(firstMealQuery);
    const meal = tables[0][0];

    if (!meal) {
      return res.status(404).json({ error: "No meals found" });
    }
    res.json(meal);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Last Meal
mealsRouter.get("/last-meal", async (req, res) => {
  try {
    const lastMealQuery =
      process.env.DB_CLIENT === "mysql2"
        ? "SELECT * FROM meal ORDER BY id DESC LIMIT 1;"
        : "SHOW TABLES;";
    const tables = await knex.raw(lastMealQuery);
    const meal = tables[0][0];

    if (!meal) {
      return res.status(404).json({ error: "No meals found" });
    }

    res.json(meal);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default mealsRouter;
