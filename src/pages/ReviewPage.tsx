import { Autocomplete, Box, Grid, Slider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import supabase from "../supabase";
import { University } from "../types";

const ReviewPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [universityId, setUniversityId] = useState<string>();
  const [academics, setAcademics] = useState<number>(0);
  const [housing, setHousing] = useState<number>(0);
  const [location, setLocation] = useState<number>(0);
  const [clubs, setClubs] = useState<number>(0);
  const [food, setFood] = useState<number>(0);
  const [social, setSocial] = useState<number>(0);
  const [opportunities, setOpportunities] = useState<number>(0);
  const [safety, setSafety] = useState<number>(0);
  const [overall, setOverall] = useState<number>(0);

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

  return (
    <Box width="100vw" height="75vh">
      <Grid container padding="15px">
        <Grid item md={6} sm={12} xs={12}>
          <Autocomplete
            options={universities}
            getOptionLabel={(option: University) =>
              `${option.name}, ${option.countryCode}`
            }
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(e, newValue) => {
              setUniversityId(newValue?.id);
              console.log(newValue?.id);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select University" />
            )}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setAcademics(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setHousing(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setLocation(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setClubs(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setFood(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setSocial(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setOpportunities(newValue as number)}
          />
          <Slider
            size="small"
            defaultValue={50}
            aria-label="Small"
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setSafety(newValue as number)}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          {overall.toFixed(1)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReviewPage;
