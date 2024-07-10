import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import useWindowDimensions from "../useWindowDimensions";

const HomePage = () => {
  const { width } = useWindowDimensions();
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      height="70vh"
      width="100vw"
    >
      <Typography
        fontWeight={550}
        sx={{ fontSize: { md: 100, sm: 80, xs: 60 } }}
        color={"primary"}
      >
        CollegeRanks
      </Typography>
      <Typography fontSize={32} fontWeight={500} color="secondary">
        <Typewriter
          options={{
            strings: [
              "Compare Schools",
              "Review Your School",
              "Find Your Dream School",
              "Look At Rankings",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </Typography>
      <TextField
        placeholder="Search University"
        sx={{
          width: { md: 0.4 * width, sm: 0.55 * width, xs: 0.7 * width },
          marginY: 3,
        }}
        InputProps={{
          style: {
            borderRadius: "35px",
            backgroundColor: "#F9F4F4",
            height: "45px",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Change to column for vertical stacking
          justifyContent: "center", // Align items to the bottom
          alignItems: "center", // Center items horizontally
          gap: "40px", // Gap between items
          position: "fixed", // Fixed position to stay at the bottom
          bottom: 0, // Start at the very bottom
          left: 0,
          right: 0, // Stretch across the screen to center content
        }}
      >
        <Accordion
          sx={{
            backgroundColor: "#F1E0E0",
            borderRadius: "15px 15px 0 0",
            width: "auto", // Adjust width as needed
          }}
        >
          <AccordionSummary>
            <Typography>How does CollegeRanks work?</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            backgroundColor: "#F1E0E0",
            borderRadius: "15px 15px 0 0",
            width: "auto", // Adjust width as needed
          }}
        >
          <AccordionSummary>
            <Typography>Do I need an account?</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HomePage;
