import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Container,
  Grid,
  Divider,
  Tooltip,
  Avatar,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FaCss3Alt,
  FaHtml5,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import HomeIcon from "@mui/icons-material/Home"; // Import the Home icon

// Styled components
const Header = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  textAlign: "center",
  flexGrow: 1,
  transition: "color 0.3s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    color: theme.palette.grey[500],
  },
}));

const TeamMemberContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "10px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: "0 auto",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "rotate(15deg)",
  },
}));

const AnimatedIcon = styled("div")(({ theme, color }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.3s ease, color 0.3s ease",
  fontSize: 40,
  cursor: "pointer",
  color: color || theme.palette.text.primary,
  "&:hover": {
    transform: "scale(1.2) rotate(15deg)",
    color: theme.palette.primary.main,
    animation: "pulse 1.5s infinite",
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1.2) rotate(15deg)", opacity: 1 },
    "50%": { transform: "scale(1.3) rotate(15deg)", opacity: 0.7 },
    "100%": { transform: "scale(1.2) rotate(15deg)", opacity: 1 },
  },
}));

// SkillIcon Component
const SkillIcon = ({ skill }) => {
  let iconColor;
  let icon;

  switch (skill) {
    case "HTML5":
      iconColor = "#E44D26"; // HTML5 color
      icon = <FaHtml5 />;
      break;
    case "CSS3":
      iconColor = "#1572B6"; // CSS3 color
      icon = <FaCss3Alt />;
      break;
    case "JavaScript":
      iconColor = "#F7DF1E"; // JavaScript color
      icon = <TbBrandJavascript />;
      break;
    case "React":
      iconColor = "#61DAFB"; // React color
      icon = <FaReact />;
      break;
    case "Node.js":
      iconColor = "#8CC84B"; // Node.js color
      icon = <FaNodeJs />;
      break;
    case "PostgreSQL":
      iconColor = "#336791"; // PostgreSQL color
      icon = <FaDatabase />;
      break;
    default:
      return null;
  }

  return (
    <Tooltip title={skill} arrow>
      <AnimatedIcon color={iconColor}>{icon}</AnimatedIcon>
    </Tooltip>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          marginBottom: "20px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "divider",
          }}
        >
          <Header
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
                transition: "color 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  color: "primary.light",
                },
              },
            }}
            variant="h2"
            onClick={navigateHome}
          >
            <HomeIcon style={{ marginRight: "8px", fontSize: "2rem" }} />{" "}
            {/* Add Home icon */}
            Algorithm Visualizer
          </Header>
        </Toolbar>
      </Box>
      <Container style={{ padding: "20px" }}>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Hi there from the Algorithm Visualizer team! We’re a group of
          passionate developers on a mission to make algorithms easier to
          understand and more accessible through engaging visualizations. Our
          goal is to support students, educators, and anyone interested in
          algorithms with tools that make learning and teaching a breeze.
        </Typography>
         <img
          src="./gif/DBzChar.gif"
          alt="DBZ"
          style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
        />
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="h5" gutterBottom>
          Team
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              name: "Dagim J",
              role: "Fullstack Developer",
              img: "./gif/goku.gif",
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Node.js",
                "PostgreSQL",
              ],
            },
            {
              name: "Yukun Z",
              role: "Fullstack Developer",
              img: "./gif/vegeta.gif",
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Node.js",
                "PostgreSQL",
              ],
            },
            {
              name: "Christopher D",
              role: "Fullstack Developer",
              img: "./gif/broly.gif",
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Node.js",
                "PostgreSQL",
              ],
            },
            {
              name: "David C",
              role: "Fullstack Developer",
              img: "./gif/trunks.gif",
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Node.js",
                "PostgreSQL",
              ],
            },
            {
              name: "Ashleigh M",
              role: "Fullstack Developer",
              img: "./gif/bulma.gif",
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript",
                "React",
                "Node.js",
                "PostgreSQL",
              ],
            },
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TeamMemberContainer>
                <Tooltip arrow title={member.name}>
                  <StyledAvatar src={member.img} alt={member.name} />
                </Tooltip>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="body2">{member.role}</Typography>
                <Box
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {member.skills.map((skill, i) => (
                    <Box key={i} style={{ margin: "5px" }}>
                      <SkillIcon skill={skill} />
                    </Box>
                  ))}
                </Box>
              </TeamMemberContainer>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
