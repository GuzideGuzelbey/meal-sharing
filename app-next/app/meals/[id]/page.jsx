"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function MealDetailPage() {
  const { id } = useParams();
  const theme = useTheme();

  const [meal, setMeal] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phonenumber: "" });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        `http://localhost:3001/api/reservations/${id}`
      );
      const data = await response.json();
      setMeal(data);
    };
    fetchMeal();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, meal_id: id }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phonenumber: "" });
      } else {
        throw new Error("Reservation failed");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  console.log("Meal object from API:", meal);

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

  const remainingSeats =
    Number(meal.max_reservations) - Number(meal.total_reserved || 0);

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
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              name="phonenumber"
              value={form.phonenumber}
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

      <Dialog open={status !== null} onClose={handleCloseDialog}>
        <DialogTitle>
          {status === "success"
            ? "Reservation Confirmed"
            : "Reservation Failed"}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
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
          <Button onClick={handleCloseDialog} autoFocus>
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
