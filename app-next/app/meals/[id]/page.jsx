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
  Grid,
  Rating,
  Paper,
} from "@mui/material";

export default function MealDetailPage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [reservationsForm, setReservationsForm] = useState({
    contact_name: "",
    contact_email: "",
    contact_phonenumber: "",
    number_of_guests: 1,
  });

  const [reviewForm, setReviewForm] = useState({
    title: "",
    stars: 3,
    description: "",
  });

  const [status, setStatus] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(null);
  const [reviews, setReviews] = useState([]);

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

    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/reviews/meal/${id}`);
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Review fetch failed:", err);
      }
    };

    fetchMeal();
    fetchReviews();
  }, [id, updated]);

  const remainingSeats = meal?.max_reservations - (meal?.total_reserved || 0);

  const handleReservationsChange = ({ target: { name, value } }) => {
    setReservationsForm((prev) => ({
      ...prev,
      [name]: name === "number_of_guests" ? Number(value) : value,
    }));
  };

  const handleReviewChange = ({ target: { name, value } }) => {
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...reservationsForm, meal_id: id }),
      });

      if (!res.ok) throw new Error("Reservation failed");

      await fetch(`http://localhost:3001/api/meals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total_reserved:
            Number(meal?.total_reserved || 0) +
            reservationsForm.number_of_guests,
        }),
      });

      setStatus("success");
      setReservationsForm({
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const { title, stars, description } = reviewForm;
      const res = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, stars, description, meal_id: id }),
      });
      if (!res.ok) throw new Error("Review failed");
      setReviewForm({ title: "", stars: 3, description: "" });
      setReviewStatus("success");
    } catch (err) {
      console.error("Review error:", err);
      setReviewStatus("error");
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

  return (
    <Container key={id} maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="flex-start" gap={2} mb={4}>
        <Link href="/meals" passHref>
          <Button variant="outlined" color="secondary">
            ← Back
          </Button>
        </Link>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
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
          <Typography variant="body1">{meal.description}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Location: {meal.location}
          </Typography>
          <Typography variant="body1">Price: {meal.price} DKK</Typography>
          <Typography variant="body1">
            Remaining Seats: {remainingSeats}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row" gap={2}>
            <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
              <Typography variant="h6">Book a Seat</Typography>
              {remainingSeats > 0 ? (
                <Box
                  component="form"
                  onSubmit={handleSubmitReservation}
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
                      value={reservationsForm[name]}
                      onChange={handleReservationsChange}
                      required
                    />
                  ))}
                  <TextField
                    label="Number of Guests"
                    name="number_of_guests"
                    type="number"
                    inputProps={{ min: 1, max: remainingSeats }}
                    value={reservationsForm.number_of_guests}
                    onChange={handleReservationsChange}
                    required
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    Reserve
                  </Button>
                </Box>
              ) : (
                <Alert severity="warning">
                  No seats available for this meal.
                </Alert>
              )}
            </Paper>
            <Paper elevation={3} sx={{ p: 2, flex: 1 }}>
              <Typography variant="h6">Add a Review</Typography>

              <Box
                component="form"
                onSubmit={handleSubmitReview}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="title"
                  label="Review Title"
                  value={reviewForm.title}
                  onChange={handleReviewChange}
                  required
                />
                <Rating
                  name="stars"
                  value={Number(reviewForm.stars)}
                  onChange={(e, value) =>
                    setReviewForm((prev) => ({ ...prev, stars: value }))
                  }
                />
                <TextField
                  name="description"
                  label="Review"
                  multiline
                  rows={3}
                  value={reviewForm.description}
                  onChange={handleReviewChange}
                  required
                />
                <Button type="submit" variant="outlined">
                  Submit Review
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

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
      <Dialog
        open={reviewStatus !== null}
        onClose={() => setReviewStatus(null)}
      >
        <DialogTitle>
          {reviewStatus === "success"
            ? "Review Submitted"
            : "Review Submission Failed"}
          <IconButton
            aria-label="close"
            onClick={() => setReviewStatus(null)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {reviewStatus === "success"
              ? "Your review has been successfully submitted!"
              : "Something went wrong while trying to submit your review."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewStatus(null)} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
