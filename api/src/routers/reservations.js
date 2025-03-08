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

// POST New Reservation
reservationsRouter.post("/", async (req, res) => {
  const newReservation = req.body;
  try {
    const reservationID = await knex("reservation").insert(newReservation);
    console.log(newReservation);
    res.status(201).json({
      newReservation,
      message: "Successfully inserted new reservation",
    });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reservationsRouter;
