import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import NavBar from "../NavBar/NavBarMain";
import MiddleTitle from "../middletitle/MiddleTitle";
import SortContainer from "../sortContainer/SortContainer";
import Footer from "../footer/Footer";
import PathfinderContainer from "../PathfinderContainer/PathfinderContainer";
import Typewriter from "typewriter-effect";
import "./LandingPage.css";

// Custom Typewriter component with complex typing effects
const CustomTypewriter = () => (
  <Typewriter
    onInit={(typewriter) => {
      typewriter
        .typeString("<Typography style='font-family: \"Teko\", sans-serif;'>Master </Typography>")
        .pauseFor(2000)
        .typeString("<Typography style='color: blue; font-family: \"Teko\", sans-serif;'>Algorithms </Typography>")
        .pauseFor(2000)
        .typeString("<Typography font-family: \"Teko\", sans-serif;'>with Interactive Visualizations</Typography>")
        .pauseFor(2000)
        .deleteAll()
        .pauseFor(2000)
        .start();
    }}
    options={{
      autoStart: true,
      loop: true,
      delay: 50,
      deleteSpeed: 50,
    }}
  />
);

const LandingPage = () => {
  const videoSrc = `${process.env.PUBLIC_URL}/mp4/0yEX6dfG1L8t8Nv9a2UX9k1DfI9lTOMX_9c5a0990aaa1b93e60a271db06dfbac9f2ad25e10bef32cd5cd54e19d46eabf5.mp4`;
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          my: { xs: 4, md: 8 },
          px: { xs: 2, md: 4 },
          minHeight: "50vh", // Ensure the container takes up at least 80% of viewport height
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: "center", md: "left" },
            my: 4,
            px: { xs: 2, md: 4 },
            order: { xs: 2, md: 1 },
            position: { md: "relative" },
            left: { md: -100 }, // Adjust position for larger screens
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: "h5.fontSize", md: "h2.fontSize" },
              textAlign: { xs: "center", md: "left" },
              fontFamily: "Teko",
            }}
          >
            <CustomTypewriter />
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: { xs: "body2.fontSize", md: "h6.fontSize" },
              fontFamily: "sans-serif",
              textAlign: { xs: "center", md: "left" },
              mt: 2,
            }}
          >
            Enhance your understanding of computer science with our engaging, interactive lessons.
            Start visualizing sorting and pathfinding algorithms today!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
              gap: 2,
              my: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/sorting")}
              sx={{ flexShrink: 0 }}
            >
              Sorting visualizer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/pathfinding")}
              sx={{ flexShrink: 0 }}
            >
              Pathfinder visualizer
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => navigate("/goal")}
              sx={{ flexShrink: 0, left: "130px" }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end", // Align the video to the right
            alignItems: "center",
            my: 4,
            px: { xs: 2, md: 4 },
            order: { xs: 1, md: 2 },
            position: { md: "relative" },
            right: { md: -150 }, // Adjust position for larger screens
          }}
        >
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "auto", maxWidth: "100%" }}
          />
        </Box>
      </Container>
      <MiddleTitle />
      <SortContainer />
      <PathfinderContainer />
      <Footer />
    </div>
  );
};

export default LandingPage;