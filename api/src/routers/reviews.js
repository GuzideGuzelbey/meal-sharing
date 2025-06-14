import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const reviewsRouter = express.Router();

// GET All reviews
reviewsRouter.get("/", async (req, res) => {
  try {
    const reviews = await knex("review").select("*");
    console.log(reviews);
    res.status(200).json({ reviews });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET All reviews for a specific meal
reviewsRouter.get("/meal/:meal_id", async (req, res) => {
  const mealID = req.params.meal_id;
  try {
    const review = await knex("review")
      .select("*")
      .where({ meal_id: mealID })
      .first();
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res.status(201).json({ review });
    console.log(review);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST New review
reviewsRouter.post("/", async (req, res) => {
  const newreview = {
    ...req.body,
    created_date: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  try {
    const reviewID = await knex("review").insert(newreview);
    console.log(newreview);
    res.status(201).json({
      newreview,
      message: "Successfully inserted new review",
    });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET Return a review by id
reviewsRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const review = await knex("review").select("*").where({ id: ID }).first();
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res.status(201).json({ review });
    console.log(review);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Update a review by id
reviewsRouter.put("/:id", async (req, res) => {
  const ID = req.params.id;
  const updatedreview = req.body;
  try {
    const review = await knex("review").where({ id: ID }).update(updatedreview);
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res.status(200).json({ updatedreview });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE the review by id

reviewsRouter.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  const deletedreview = req.body;
  try {
    const review = await knex("review").where({ id: ID }).del(deletedreview);
    if (!review) {
      return res.status(404).json({ error: "review not found" });
    }
    res.status(200).json({ message: "review deleted successfully" });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default reviewsRouter;
