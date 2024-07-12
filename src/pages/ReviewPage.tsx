/* eslint-disable no-unsafe-optional-chaining */
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Fade,
  Grid,
  Slider,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Review, University } from "../utils/types";
import useWindowDimensions from "../utils/useWindowDimensions";
import { useAuth } from "../utils/AuthProvider";
import CheckIcon from "@mui/icons-material/Check";
import { isMobile } from "react-device-detect";

const ReviewPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [universityId, setUniversityId] = useState<string>();
  const [academics, setAcademics] = useState<number>(50);
  const [housing, setHousing] = useState<number>(50);
  const [location, setLocation] = useState<number>(50);
  const [clubs, setClubs] = useState<number>(50);
  const [food, setFood] = useState<number>(50);
  const [social, setSocial] = useState<number>(50);
  const [opportunities, setOpportunities] = useState<number>(50);
  const [safety, setSafety] = useState<number>(50);
  const [overall, setOverall] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [singleUniversity, setSingleUniversity] = useState<University>();

  const theme = useTheme();
  const { width } = useWindowDimensions();
  const { user } = useAuth();

  useEffect(() => {
    const newOverall =
      0.16 * academics +
      0.11 * housing +
      0.12 * location +
      0.09 * clubs +
      0.1 * food +
      0.15 * social +
      0.17 * opportunities +
      0.1 * safety;
    setOverall(newOverall);
  }, [
    academics,
    clubs,
    food,
    housing,
    location,
    opportunities,
    safety,
    social,
  ]);

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
  const handleSubmit = async () => {
    if (!universityId) {
      console.error("No university ID provided");
      return;
    }

    const reviewToSubmit: Review = {
      academics,
      clubs,
      food,
      housing,
      location,
      opportunities,
      safety,
      social,
      overall,
      universityId,
      createdAt: new Date(),
    };

    const { error: insertError } = await supabase
      .from("Reviews")
      .insert([reviewToSubmit]);

    if (insertError) {
      console.error("Error inserting review:", insertError);
      return;
    }
    console.log("Review submitted successfully");

    const { data: university, error: fetchError } = await supabase
      .from("Universities")
      .select("*")
      .eq("id", universityId)
      .single();

    if (fetchError || !university) {
      console.error("Error fetching university:", fetchError);
      return;
    }

    setSingleUniversity(university as University);

    const updatedMetrics = {
      avgAcademics: university.avgAcademics
        ? [...university.avgAcademics, academics]
        : [academics],
      avgHousing: university.avgHousing
        ? [...university.avgHousing, housing]
        : [housing],
      avgLocation: university.avgLocation
        ? [...university.avgLocation, location]
        : [location],
      avgClubs: university.avgClubs ? [...university.avgClubs, clubs] : [clubs],
      avgFood: university.avgFood ? [...university.avgFood, food] : [food],
      avgSocial: university.avgSocial
        ? [...university.avgSocial, social]
        : [social],
      avgOpportunities: university.avgOpportunities
        ? [...university.avgOpportunities, opportunities]
        : [opportunities],
      avgSafety: university.avgSafety
        ? [...university.avgSafety, safety]
        : [safety],
      overallAverage: university.overallAverage
        ? [...university.overallAverage, overall]
        : [overall],
    };

    const { error: updateError } = await supabase
      .from("Universities")
      .update(updatedMetrics)
      .eq("id", universityId);

    if (updateError) {
      console.error("Error updating university:", updateError);
      return;
    }

    setShowAlert(true);
    console.log("University updated successfully");
  };

  return (
    <Box
      sx={{
        width: { md: "98vw", sm: "fit-content", xs: "fit-content" },
      }}
      height="fit-content"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      marginTop="85px"
      marginBottom="15px"
    >
      {showAlert && (
        <Fade in={showAlert} timeout={500}>
          <Alert
            sx={{
              position: "fixed",
              bottom: isMobile ? "auto" : "15px",
              top: isMobile ? "15px" : "auto",
              left: isMobile ? "50%" : "15px",
              width: isMobile ? "70vw" : "fit-content",
              transform: isMobile ? "translateX(-50%)" : "none",
              zIndex: 1000,
              borderRadius: "12px",
              backgroundColor: theme.palette.primary.light,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            icon={
              <CheckIcon
                fontSize="inherit"
                sx={{ color: "white", marginTop: "4px" }}
              />
            }
            onClose={() => {
              setShowAlert(false);
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "16px", md: "17px" } }}
              color="white"
            >
              Review for {singleUniversity?.name} submitted successfully!
            </Typography>
          </Alert>
        </Fade>
      )}
      <Grid container paddingX="30px" paddingY="16px">
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          padding="15px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "flex-start", sm: "center", xs: "center" },
            alignItems: {
              md: "flex-start",
              sm: "center",
              xs: "center",
            },
          }}
          width="fit-content"
        >
          <Autocomplete
            sx={{ paddingLeft: "15px" }}
            id="combo-box-demo"
            options={universities}
            getOptionLabel={(option: University) =>
              `${option.name}, ${option.countryCode}`
            }
            onInputChange={(_e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(_e, newValue) => {
              setUniversityId(newValue?.id);
              console.log(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "35px",
                    backgroundColor: "#F9F4F4",
                    height: "45px",
                    boxShadow: "-1px 2px 1px #7a7171",
                    fontSize: "18px",
                  },
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                  height: "fit-content",
                  marginY: 2,
                }}
                {...params}
                placeholder="Select your institution"
              />
            )}
          />
          <Box
            width="fit-content"
            overflow={"auto"}
            marginTop="15px"
            marginLeft="2.5px"
            paddingRight="25px"
            paddingLeft="15px"
            sx={{
              maxHeight: { md: "64vh", sm: "100%", xs: "100%" },
              "::-webkit-scrollbar": {
                width: "8px",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-track": {
                backgroundColor: "#bcb8b8",
                borderRadius: "10px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.secondary.main,
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
              },
            }}
          >
            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="A measure of academic quality, faculty, and research opportunities."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Academics
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={academics}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setAcademics(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="Relates to the quality of the dormitories and off-campus housing."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Housing
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={housing}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setHousing(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The quality and convenience of the surrounding area and the campus itself."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Location
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={location}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setLocation(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The variety and quality of clubs and extracurricular activities."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Clubs
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={clubs}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setClubs(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The quality, variety, sustainability, and inclusivity of food options on and around campus."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Dining
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={food}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setFood(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The noteworthiness of social life and events on campus."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Social
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={social}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setSocial(newValue as number)}
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The availability and quality of internships, research, networking, and job opportunities."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Opportunities
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={opportunities}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) =>
                  setOpportunities(newValue as number)
                }
              />
            </Box>

            <Box
              width="fit-content"
              height="fit-content"
              marginY={1.2}
              display="flex"
              flexDirection="column"
            >
              <Box display="inline-flex" alignItems="center">
                <Tooltip
                  arrow
                  placement="right"
                  title="The safety and security of the campus and surrounding area."
                >
                  <Typography
                    fontWeight={500}
                    fontSize={18}
                    sx={{ color: "#484847" }}
                  >
                    Safety
                  </Typography>
                </Tooltip>
              </Box>
              <Slider
                sx={{
                  width: {
                    md: 0.4 * width,
                    sm: 0.63 * width,
                    xs: 0.69 * width,
                  },
                }}
                size="small"
                value={safety}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={(_e, newValue) => setSafety(newValue as number)}
              />
            </Box>

            <Button
              onClick={handleSubmit}
              disabled={!user}
              sx={{
                marginY: "10px",
                textTransform: "none",
                fontSize: "18px",
                borderRadius: "8px",
                padding: "5px 15px",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                },
              }}
            >
              submit
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: { md: "flex-end", sm: "center", xs: "center" },
            alignItems: { md: "flex-end", sm: "center", xs: "center" },
          }}
          width="fit-content"
        >
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              marginTop="18px"
            >
              <Typography fontSize={18} fontWeight={500}>
                Overall
              </Typography>
              <Typography fontSize={18} fontWeight={500}>
                Score
              </Typography>
            </Box>
            <Typography fontSize={105} fontWeight={650} sx={{ ml: 1 }}>
              {overall.toFixed(1)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewPage;
