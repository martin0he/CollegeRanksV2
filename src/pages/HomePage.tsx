import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import Typewriter, { Options } from "typewriter-effect";
import useWindowDimensions from "../useWindowDimensions";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
          options={
            {
              strings: [
                "Compare Schools",
                "Review Your School",
                "Find Your Dream School",
                "Look At Rankings",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              pauseFor: 2000,
            } as Partial<Options>
          }
        />
      </Typography>
      <TextField
        placeholder="Search University"
        sx={{
          width: { md: 0.4 * width, sm: 0.55 * width, xs: 0.7 * width },
          marginY: 6,
        }}
        InputProps={{
          style: {
            borderRadius: "35px",
            backgroundColor: "#F9F4F4",
            height: "45px",
            border: "none",
            boxShadow: "-1px 2px 1px #7a7171",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          gap: "20px",
        }}
      >
        <Accordion
          sx={{
            backgroundColor: "#F1E0E0",
            borderRadius: "15px 15px 0px 0px",
            width: "350px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandLessIcon />}>
            <Typography>How does CollegeRanks work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Here, you can view the average metric ratings for your
              institution, look at the leaderboard accompanied by filters, and
              review your own school to help others obtain an accurate
              representation.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            backgroundColor: "#F1E0E0",
            borderRadius: "15px 15px 0px 0px",
            width: "350px",
          }}
        >
          <AccordionSummary expandIcon={<ExpandLessIcon />}>
            <Typography>Do I need an account?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              As a guest, you can still view the rating for any school as well
              as look at the leaderboard. To review your school, you must create
              an account.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default HomePage;
