import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// Future Meals
mealsRouter.get("/future-meals", async (req, res) => {
  try {
    const futureMealsQuery = "SELECT * FROM meal WHERE `when` > NOW() ;";
    const [meals, schema] = await knex.raw(futureMealsQuery);
    res.json({ meals });
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
    const [meals, schema] = await knex.raw(pastMealsQuery);
    res.json({ meals });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// All Meals
mealsRouter.get("/all-meals", async (req, res) => {
  try {
    const allMealsQuery = "SELECT * FROM meal;";
    const [meals, schema] = await knex.raw(allMealsQuery);
    res.json({ meals });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//First Meal
mealsRouter.get("/first-meal", async (req, res) => {
  try {
    const firstMealQuery = "SELECT * FROM meal ORDER BY id ASC LIMIT 1;";
    const [meals, schema] = await knex.raw(firstMealQuery);
    const meal = meals[0][0];

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
    const lastMealQuery = "SELECT * FROM meal ORDER BY id DESC LIMIT 1;";
    const [meals, schema] = await knex.raw(lastMealQuery);
    const meal = meals[0][0];

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
