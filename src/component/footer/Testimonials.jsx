// Testimonials.js
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import useTestimonials from "./useTestimonials.jsx";
import HomeIcon from '@mui/icons-material/Home'; // Import the Home icon

// import testimonialUtils from "./testimonialUtils.jsx";

// Functional component to render a star rating
const StarRating = ({ rating }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
    {Array(5)
      .fill()
      .map((_, index) =>
        index < rating ? (
          <StarIcon key={index} sx={{ color: "primary.main", fontSize: 16 }} />
        ) : (
          <StarBorderIcon
            key={index}
            sx={{ color: "primary.main", fontSize: 16 }}
          />
        )
      )}
  </Box>
);

const Testimonials = () => {
  const navigate = useNavigate();
  const {
    testimonials,
    newUser,
    setNewUser,
    newRating,
    setNewRating,
    newComment,
    setNewComment,
    errors,
    addTestimonial,
  } = useTestimonials();

  const [sortCriteria, setSortCriteria] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // State for dialog
  const [openDialog, setOpenDialog] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Callback function for navigating to the home page
  const navigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // Function to handle opening the dialog
  const handleOpenDialog = () => setOpenDialog(true);

  // Function to handle closing the dialog
  const handleCloseDialog = () => setOpenDialog(false);

  // Function to handle adding a new testimonial
  const handleAddTestimonial = () => {
    addTestimonial(() => {
      setSnackbarMessage("Testimonial added successfully!");
      setSnackbarOpen(true);
      handleCloseDialog();
    });
  };

  // Function to filter testimonials based on search and rating
  const filteredTestimonials = useTestimonials().filterTestimonials(
    testimonials,
    searchQuery,
    selectedRating
  );

  // Function to sort testimonials based on the selected criteria
  const sortedTestimonials = useTestimonials().sortTestimonials(
    filteredTestimonials,
    sortCriteria
  );

  // Function to handle closing the snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Container
      sx={{
        py: 4,
        background: "linear-gradient(to right, #f5f7f9, #e3e4e8)",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          cursor: "pointer",
          mb: 4,
          color: "primary.main",
          fontWeight: "bold",
          transition: "color 0.3s",
          "&:hover": {
            color: "primary.dark",
          },
        }}
        onClick={navigateHome}
      >
            <HomeIcon style={{ marginRight: "8px", fontSize: "2rem" }} /> {/* Add Home icon */}

        What Our Customers Are Saying
      </Typography>

      {/* Control Panel */}
      <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Search bar */}
        <TextField
          fullWidth
          label="Search User or Comment"
          variant="outlined"
          sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: 1 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Control Filters */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Filter by rating */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              label="Rating"
              sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: 1 }}
            >
              <MenuItem value="">All Ratings</MenuItem>
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort dropdown menu */}
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              label="Sort By"
              sx={{ bgcolor: "#fff", borderRadius: 1, boxShadow: 1 }}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>
          </FormControl>

          {/* Button to add a new testimonial */}
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Add Testimonial
          </Button>
        </Stack>
      </Box>

      {/* Grid layout to display sorted testimonials */}
      <Grid container spacing={2}>
        {sortedTestimonials.map((testimonial) => (
          <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {/* Display user info and rating */}
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "#fff",
                      fontWeight: "bold",
                      width: 40,
                      height: 40,
                      fontSize: "2rem",
                    }}
                  >
                    {testimonial.user.charAt(0)}{" "}
                    {/* Display the initial of the user */}
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: "bold", fontSize: "1rem" }}
                  >
                    {testimonial.user}
                  </Typography>
                  <StarRating rating={testimonial.rating} />{" "}
                  {/* Render star rating */}
                </Grid>
              </Grid>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "1rem" }}
              >
                {testimonial.comment} {/* Display the comment */}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for adding a new testimonial */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Testimonial</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            error={errors.user}
            helperText={errors.user ? "User Name is required" : ""}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth error={errors.rating} sx={{ mb: 2 }}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              label="Rating"
            >
              <MenuItem value="">None</MenuItem>
              {[1, 2, 3, 4, 5].map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating} Star{rating > 1 ? "s" : ""}
                </MenuItem>
              ))}
            </Select>
            {errors.rating && (
              <FormHelperText>Rating is required</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            label="Comment"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            error={errors.comment}
            helperText={errors.comment ? "Comment is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddTestimonial}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        action={
          <Button color="inherit" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Testimonials;