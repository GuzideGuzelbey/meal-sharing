import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

// GET All Meals
mealsRouter.get("/", async (req, res) => {
  try {
    let query = knex("meal").select([
      "meal.id",
      "meal.title",
      "meal.description",
      "meal.location",
      "meal.when",
      "meal.max_reservations",
      "meal.price",
      "meal.created_date",
    ]);

    // maxPrice query parameter
    if (req.query.maxPrice) {
      const maxPrice = parseFloat(req.query.maxPrice);
      if (!isNaN(maxPrice)) {
        query.where("price", "<=", maxPrice);
      }
    }

    // availableReservations query parameter
    if (req.query.availableReservations) {
      const available = req.query.availableReservations === "true";
      query
        .leftJoin("reservation", "meal.id", "reservation.meal_id")
        .count("reservation.id as total_reservations")
        .groupBy([
          "meal.id",
          "meal.title",
          "meal.description",
          "meal.location",
          "meal.when",
          "meal.max_reservations",
          "meal.price",
          "meal.created_date",
        ])
        .having(
          "max_reservations",
          available ? ">" : "<=",
          knex.raw("COALESCE(COUNT(reservation.id), 0)")
        );
    }

    // title query parameter
    if (req.query.title) {
      let title = req.query.title;
      if (typeof title === "object" && title !== null) {
        title = title.title;
      }
      title = String(title);
      console.log("Extracted Title:", title);
      query.whereILike("meal.title", `%${title}%`);
    }

    // dateAfter query parameter
    if (req.query.dateAfter) {
      let dateAfter = req.query.dateAfter;
      const parsedDate = new Date(dateAfter);
      if (isNaN(parsedDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid dateAfter format. Use YYYY-MM-DD." });
      }

      const formattedDate = parsedDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      query.where("when", ">=", formattedDate);
    }

    // dateBefore query parameter
    if (req.query.dateBefore) {
      let dateBefore = req.query.dateBefore;
      const parsedDate = new Date(dateBefore);
      if (isNaN(parsedDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid dateBefore format. Use YYYY-MM-DD." });
      }

      const formattedDate = parsedDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      query.where("when", "<=", formattedDate);
    }

    // sortKey and sortDir query parameters
    if (req.query.sortKey) {
      let sortKey = String(req.query.sortKey).toLowerCase();
      const validKeys = ["when", "max_reservations", "price"];

      if (validKeys.includes(sortKey)) {
        let sortDir = "asc";

        if (req.query.sortDir) {
          const validDir = ["asc", "desc"];
          let sortDirInput = String(req.query.sortDir).toLowerCase();
          if (validDir.includes(sortDirInput)) {
            sortDir = sortDirInput;
          } else {
            return res.status(400).json({ error: "Invalid direction" });
          }
        }

        query.orderBy(sortKey, sortDir);
      } else {
        return res.status(400).json({ error: "Invalid sort key" });
      }
    }

    let meals = await query;

    // limit query parameter
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (!isNaN(limit) && limit > 0) {
        meals = meals.slice(0, limit);
      }
    }

    return res.status(200).json({ totalMeals: meals.length, meals });
  } catch (error) {
    console.error("DB query failed", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
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
    console.error("DB query failed:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
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
