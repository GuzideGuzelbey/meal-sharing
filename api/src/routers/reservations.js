import "dotenv/config";
import express from "express";
import knex from "../database_client.js";

const reservationsRouter = express.Router();

// GET All Reservations
reservationsRouter.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservation").select("*");
    console.log(reservations);
    res.status(200).json({ reservations });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reservationsRouter;
