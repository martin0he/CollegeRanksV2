/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Typewriter, { Options } from "typewriter-effect";
import useWindowDimensions from "../utils/useWindowDimensions";

import { University } from "../utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import BottomAccordion from "../components/BottomAccordion";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const theme = useTheme();
  const biggerThanMd = useMediaQuery(theme.breakpoints.up("xs"));

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data, error } = await supabase
        .from("Universities")
        .select("name, id, countryCode")
        .ilike("name", `%${inputValue}%`);

      if (error) {
        console.error("Error fetching universities:", error);
        return;
      }
      setUniversities(data as University[]);
    };

    fetchUniversities();
  }, [inputValue]);

  const handleUniversitySelect = (_e: any, newValue: University | null) => {
    if (newValue) {
      navigate(`/university/${newValue.id}`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      height="fit-content"
      width="100vw"
    >
      <Box
        padding="20px"
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          fontWeight={550}
          sx={{ fontSize: { md: 100, sm: 80, xs: 60 } }}
          color={"primary"}
        >
          CollegeRanks
        </Typography>
        <Typography
          sx={{ fontSize: { md: 32, sm: 28, xs: 24 } }}
          fontWeight={500}
          color="secondary"
        >
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
        <Autocomplete
          id="combo-box-demo"
          options={universities}
          getOptionLabel={(option: University) =>
            `${option.name}, ${option.countryCode}`
          }
          onInputChange={(_e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={handleUniversitySelect}
          renderInput={(params) => (
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "35px",
                  backgroundColor: "#F9F4F4",
                  height: "45px",
                  boxShadow: "-1px 2px 1px #7a7171",
                  fontSize: "18px",
                  padding: "15px",
                },
                width: { md: 0.4 * width, sm: 0.55 * width, xs: 0.7 * width },
                height: "fit-content",
                marginY: 3,
              }}
              {...params}
              placeholder="Select University"
            />
          )}
        />
      </Box>

      {biggerThanMd && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          bottom="0px"
          left="0"
          right="0"
          gap="36vw"
        >
          <Box display="flex" flexDirection="row" justifyContent="center">
            <BottomAccordion
              title="How does it work?"
              content="Here you can view the average metric ratings for your institution, look at the leaderboard accompanied by filters, and review your own school to help others obtain an accurate and honest insight."
            />
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            <BottomAccordion
              title="Do I need to sign up?"
              content="As a guest, you can still view any school's rating as well as use the leaderboard. To review your school, you must sign up with Google."
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
