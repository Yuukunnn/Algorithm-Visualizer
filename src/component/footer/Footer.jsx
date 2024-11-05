import React from "react";
import { Typography, Grid, Link, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000000", // Black background
        color: "#ffffff", // White text color for contrast
        padding: "40px 0",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontFamily: "Teko", }}>
          Algorithm Visualizer
        </Typography>
        <Divider style={{ margin: "20px 0", backgroundColor: "#ffffff" }} />

        <Grid container spacing={4} justifyContent="center">
          {/* Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Link
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Link
                href="/aboutus"
                color="inherit"
                underline="hover"
                sx={{ ":hover": { color: "#ffab00" }, marginBottom: "10px" }} 
              >
                About Us
              </Link>
              <Link
                href="/testimonials"
                color="inherit"
                underline="hover"
                sx={{ ":hover": { color: "#ffab00" }, marginBottom: "10px" }} 
              >
                Testimonials
              </Link>
              <Link
                href="/contactus"
                color="inherit"
                underline="hover"
                sx={{ ":hover": { color: "#ffab00" },  }}
              >
                Contact Us
              </Link>
            </div>
          </Grid>

          {/* Social Icons */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                component="a"
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: "#3b5998" },
                }}
              >
                <FacebookIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.x.com"
                target="_blank"
                aria-label="X"
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: "#1DA1F2" },
                }}
              >
                <XIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: "#0077b5" },
                }}
              >
                <LinkedInIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: "#e4405f" },
                }}
              >
                <InstagramIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
              <IconButton
                component="a"
                target="_blank"
                href="https://www.youtube.com"
                aria-label="YouTube"
                sx={{
                  color: "#ffffff",
                  "&:hover": { color: "#ff0000" },
                }}
              >
                <YouTubeIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>

        <Divider style={{ margin: "20px 0", backgroundColor: "#ffffff" }} />

        <Grid container spacing={3} justifyContent="center">
          {/* Legal Links */}
          <Grid item xs={12}>
            <Typography variant="body2">
              <Link
                href="/privacy-policy"
                color="inherit"
                underline="hover"
                sx={{ ":hover": { color: "#ffab00" } }}
              >
                Privacy Policy
              </Link>{" "}
              |
              <Link
                href="/terms-of-service"
                color="inherit"
                underline="hover"
                sx={{ ":hover": { color: "#ffab00" } }}
              >
                {" "}
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Algorithm Visualizer. All rights
              reserved.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;