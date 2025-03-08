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

//GET Return a reservation by id
reservationsRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const reservation = await knex("reservation")
      .select("*")
      .where({ id: ID })
      .first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(201).json({ reservation });
    console.log(reservation);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default reservationsRouter;
