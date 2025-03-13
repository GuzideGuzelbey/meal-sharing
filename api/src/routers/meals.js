import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// GET All Meals
mealsRouter.get("/", async (req, res) => {
  let query = knex("meal").select("*");

  if (req.query.maxPrice) {
    const maxPrice = parseFloat(req.query.maxPrice);
    if (!isNaN(maxPrice)) {
      query = query.where("price", "<=", maxPrice);
    }
  }
  try {
    const meals = await query;
    console.log(meals);
    res.status(200).json({ meals });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST New Meal
mealsRouter.post("/", async (req, res) => {
  const newMeal = req.body;
  try {
    const mealID = await knex("meal").insert(newMeal);
    console.log(mealID);
    res
      .status(201)
      .json({ newMeal, message: "Successfully inserted new meal" });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET	Return the meal by id
mealsRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const meal = await knex("meal").select("*").where({ id: ID }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(201).json({ meal });
    console.log(meal);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Update the meal by id
mealsRouter.put("/:id", async (req, res) => {
  const ID = req.params.id;
  const updatedMeal = req.body;
  try {
    const meal = await knex("meal").where({ id: ID }).update(updatedMeal);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json({ updatedMeal });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE the meal by id

mealsRouter.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  const deletedMeal = req.body;
  try {
    const meal = await knex("meal").where({ id: ID }).del(deletedMeal);
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default mealsRouter;
