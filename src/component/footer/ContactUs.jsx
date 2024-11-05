import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Keyframe animation for the moving gradient
const gradientAnimationStyle = {
  "@keyframes gradientAnimation": {
    "0%": {
      backgroundPosition: "0% 50%",
    },
    "50%": {
      backgroundPosition: "100% 50%",
    },
    "100%": {
      backgroundPosition: "0% 50%",
    },
  },
  movingGradient: {
    background: "linear-gradient(to right, #4286f4, #373B44)", // Updated gradient colors
    backgroundSize: "300% 300%",
    animation: "gradientAnimation 10s ease infinite",
  },
};

export const ContactUs = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {
      name: !formValues.name.trim(),
      email: !formValues.email.trim() || !/\S+@\S+\.\S+/.test(formValues.email),
      message: !formValues.message.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setFormStatus({ submitting: true, success: false, error: false });

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate an API call
        setFormStatus({ submitting: false, success: true, error: false });
        setFormValues({ name: "", email: "", message: "" });

        // Clear success message after 2 seconds
        setTimeout(() => {
          setFormStatus((prevStatus) => ({ ...prevStatus, success: false }));
        }, 2000);
      } catch (error) {
        setFormStatus({ submitting: false, success: false, error: true });
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        ...gradientAnimationStyle.movingGradient, // Apply the moving gradient style
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 0,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", px: 2 }} // Add padding to handle smaller screens
      >
        <Grid item xs={12} sm={8} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 8,
              p: 3,
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "white",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
              width: "100%",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
                width: "100%",
                textAlign: "center",
                mb: 3,
                fontWeight: "bold",
              }}
            >
              Contact Us
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              {formStatus.success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Your message has been sent successfully!
                </Alert>
              )}
              {formStatus.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Something went wrong. Please try again.
                </Alert>
              )}
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formValues.name}
                onChange={handleChange}
                error={formErrors.name}
                helperText={formErrors.name ? "Name is required" : ""}
                InputLabelProps={{
                  sx: {
                    fontWeight: "bold",
                    color: formErrors.name ? "error.main" : "text.primary",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
                error={formErrors.email}
                helperText={
                  formErrors.email ? "Enter a valid email address" : ""
                }
                InputLabelProps={{
                  sx: {
                    fontWeight: "bold",
                    color: formErrors.email ? "error.main" : "text.primary",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="message"
                label="Message"
                id="message"
                multiline
                rows={4}
                value={formValues.message}
                onChange={handleChange}
                error={formErrors.message}
                helperText={formErrors.message ? "Message is required" : ""}
                InputLabelProps={{
                  sx: {
                    fontWeight: "bold",
                    color: formErrors.message ? "error.main" : "text.primary",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                }}
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
