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
      reservationID,
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
  const { id } = req.params;
  try {
    const reservation = await knex("reservation")
      .select("*")
      .where({ id })
      .first();
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json({ id, reservation });
    console.log(reservation);
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT Update the reservation by id
reservationsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReservation = req.body;
  try {
    const reservation = await knex("reservation")
      .where({ id })
      .update(updatedReservation);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json({ id, updatedReservation });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE the reservation by id

reservationsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedReservation = req.body;
  try {
    const reservation = await knex("reservation")
      .where({ id })
      .del(deletedReservation);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(204).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("DB query failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default reservationsRouter;
