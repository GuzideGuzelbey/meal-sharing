"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";

export default function MealDetailPage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [form, setForm] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: 1,
  });
  const [status, setStatus] = useState(null);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/reservations/${id}`
        );
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.error("Error fetching meal:", error);
      }
    };
    fetchMeal();
  }, [id, updated]);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: name === "number_of_guests" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, meal_id: id }),
      });

      if (!res.ok) throw new Error("Reservation failed");

      await fetch(`http://localhost:3001/api/meals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_reserved:
            Number(meal.total_reserved || 0) + form.number_of_guests,
        }),
      });

      setStatus("success");
      setForm({
        contact_name: "",
        contact_email: "",
        contact_phonenumber: "",
        number_of_guests: 1,
      });
      setUpdated((prev) => !prev);
    } catch (err) {
      console.error("Reservation error:", err);
      setStatus("error");
    }
  };

  if (!meal) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          Meal not found or no reservations available.
        </Typography>
        <Box textAlign="center" mt={4}>
          <Link href="/meals" passHref>
            <Button variant="outlined" color="primary">
              Back to Meals
            </Button>
          </Link>
        </Box>
      </Container>
    );
  }

  const remainingSeats = meal.max_reservations - (meal.total_reserved || 0);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {meal.title}
      </Typography>
      {meal.image && (
        <Image
          src={`/${meal.image}`}
          alt={meal.title}
          width={400}
          height={250}
          style={{ borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <Typography variant="body1" sx={{ mb: 1 }}>
        Location: {meal.location}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Price: {meal.price} DKK
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Remaining Seats: {remainingSeats}
      </Typography>
      {remainingSeats > 0 ? (
        <>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Book a Seat
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {[
              { label: "Name", name: "contact_name" },
              { label: "Email", name: "contact_email" },
              { label: "Phone Number", name: "contact_phonenumber" },
            ].map(({ label, name }) => (
              <TextField
                key={name}
                label={label}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
              />
            ))}
            <TextField
              label="Number of Guests"
              name="number_of_guests"
              type="number"
              inputProps={{ min: 1, max: remainingSeats }}
              value={form.number_of_guests}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="secondary">
              Reserve
            </Button>
          </Box>
        </>
      ) : (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No seats available for this meal.
        </Alert>
      )}

      <Dialog open={status !== null} onClose={() => setStatus(null)}>
        <DialogTitle>
          {status === "success"
            ? "Reservation Confirmed"
            : "Reservation Failed"}
          <IconButton
            aria-label="close"
            onClick={() => setStatus(null)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {status === "success"
              ? "Your reservation has been successfully submitted!"
              : "Something went wrong while trying to make your reservation."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatus(null)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box textAlign="center" mt={5}>
        <Link href="/meals" passHref>
          <Button variant="outlined" color="primary">
            Back to Meals
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
