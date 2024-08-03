/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { CountryCodes } from "../utils/countries";
import { Review } from "../utils/types";
import supabase from "../utils/supabase";
import { DegreeLevels, Majors } from "../utils/majors";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const countryOptions = Object.entries(CountryCodes).map(([label, value]) => ({
  label,
  value,
}));

const LeaderboardPage: React.FC = () => {
  const [size, setSize] = useState<number>(10);
  const [metric, setMetric] = useState<string>("overallAverage");
  const [order, setOrder] = useState<string>("Best");
  const [country, setCountry] = useState<string>(CountryCodes.Global);
  const [level, setLevel] = useState<string>(DegreeLevels[0]);
  const [degree, setDegree] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });
  const [labelRotation, setLabelRotation] = useState<number>(60);
  const theme = useTheme();

  const metricNames: { [key: string]: string } = {
    overallAverage: "Overall",
    avgAcademics: "Academics",
    avgHousing: "Housing",
    avgLocation: "Location",
    avgClubs: "Clubs",
    avgFood: "Dining",
    avgSocial: "Social",
    avgOpportunities: "Opportunities",
    avgSafety: "Safety",
  };

  const orderNames: { [key: string]: string } = {
    Best: "Top",
    Worst: "Bottom",
  };

  const fetchUniversities = async () => {
    try {
      // fetch filtered reviews
      let reviewsQuery = supabase.from("Reviews").select("*");

      if (level) {
        reviewsQuery = reviewsQuery.eq("degreeLevel", level);
      }

      if (degree) {
        reviewsQuery = reviewsQuery.ilike("major", `%${degree}%`);
      }

      const { data: reviewsData, error: reviewsError } = await reviewsQuery;

      if (reviewsError) {
        console.error(reviewsError);
        return;
      }

      const filteredReviews = reviewsData as Review[];
      const unisFromFilteredReviews = Array.from(
        new Set(filteredReviews.map((review) => review.universityId))
      );

      // fetch universities based on filtered reviews
      let filteredUniversitiesQuery = supabase
        .from("Universities")
        .select(`id, name, countryCode, ${metric}`)
        .in("id", unisFromFilteredReviews);

      if (country !== CountryCodes.Global) {
        filteredUniversitiesQuery = filteredUniversitiesQuery.eq(
          "countryCode",
          country
        );
      }

      const {
        data: filteredUniversitiesData,
        error: filteredUniversitiesError,
      } = await filteredUniversitiesQuery;

      if (filteredUniversitiesError) {
        console.error(filteredUniversitiesError);
        return;
      }

      // mapping from University metrics to Review fields because the field names are different
      const metricMapping: { [key: string]: keyof Review } = {
        overallAverage: "overall",
        avgAcademics: "academics",
        avgHousing: "housing",
        avgLocation: "location",
        avgClubs: "clubs",
        avgFood: "food",
        avgSocial: "social",
        avgOpportunities: "opportunities",
        avgSafety: "safety",
      };

      // calculate average values for the selected metric based on reviews
      const universityMetrics: { [key: string]: number[] } = {};
      const reviewMetricKey = metricMapping[metric];

      filteredReviews.forEach((review: Review) => {
        const universityId = review.universityId;
        if (!universityMetrics[universityId]) {
          universityMetrics[universityId] = [];
        }
        universityMetrics[universityId].push(review[reviewMetricKey] as number);
      });

      const universityAverages = Object.entries(universityMetrics).map(
        ([universityId, values]) => {
          const calculateAverage = (arr: number[]): number =>
            arr.length > 0
              ? arr.reduce((acc, val) => acc + val, 0) / arr.length
              : 0;
          return {
            universityId,
            average: calculateAverage(values),
          };
        }
      );

      // map calculated averages to universities
      const universityData = filteredUniversitiesData
        .map((university: any) => {
          const match = universityAverages.find(
            (u) => u.universityId === university.id
          );
          return match
            ? {
                name: university.name,
                value: match.average,
              }
            : {
                name: university.name,
                value: null,
              };
        })
        .filter((u) => u !== null);

      // sort the data based on the selected order
      const ascending = order === "Best";
      universityData.sort((a, b) =>
        ascending
          ? (a!.value ?? 0) - (b!.value ?? 0)
          : (b!.value ?? 0) - (a!.value ?? 0)
      );

      // limit the data to the top or bottom `size` universities
      const boundedData = universityData.slice(-size);

      // if total data entries are fewer than selected number of schools, add random universities
      if (boundedData.length < size) {
        const additionalUniversitiesQuery = supabase
          .from("Universities")
          .select("id, name")
          .not("id", "in", `(${unisFromFilteredReviews.join(",")})`)
          .limit(size - boundedData.length);

        const {
          data: additionalUniversitiesData,
          error: additionalUniversitiesError,
        } = await additionalUniversitiesQuery;

        if (additionalUniversitiesError) {
          console.error(additionalUniversitiesError);
          return;
        }

        const additionalUniversities = additionalUniversitiesData.map(
          (university: any) => ({
            name: university.name,
            value: null,
          })
        );

        // add additional universities to the end of the array
        boundedData.unshift(...additionalUniversities);
      }

      const labels = boundedData.map((u) => u!.name);
      const values = boundedData.map((u) => u!.value);

      setChartData({
        labels,
        datasets: [
          {
            label: `${orderNames[order]} ${size} Universities by ${metricNames[metric]} Rating`,
            data: values,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.dark,
            borderWidth: 1,
            borderRadius: 7,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching universities: ", error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [size, metric, order, country, level, degree]);

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (isXs) {
      setLabelRotation(65);
    } else if (isSm) {
      setLabelRotation(50);
    } else {
      setLabelRotation(35);
    }
  }, [isXs, isSm]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: labelRotation,
          minRotation: labelRotation,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${orderNames[order]} ${size} Universities by ${metricNames[metric]} Rating`,
      },
    },
  };

  return (
    <Box
      sx={{
        width: { md: "98vw", sm: "fit-content", xs: "fit-content" },
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "95px",
        marginBottom: "15px",
      }}
    >
      <Grid
        container
        width="100%"
        height="100%"
        columnSpacing={1}
        padding="25px"
      >
        <Grid
          item
          md={9}
          sm={12}
          xs={12}
          display="flex"
          justifyContent="start"
          alignItems="center"
          flexDirection="column"
          sx={{
            height: "fit-content",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "100%", height: "500px" }}>
              <Bar data={chartData} options={options} />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={2}
          sm={12}
          xs={12}
          sx={{
            padding: "10px",
            margin: "10px",
          }}
          display="flex"
          justifyContent="start"
          alignItems="center"
          flexDirection="column"
        >
          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>No. Schools:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              onChange={(e) => setSize(e.target.value as number)}
              sx={{
                borderRadius: "10px 10px 3px 3px",
                backgroundColor: "#F9F4F4",
                height: "45px",
                border: "none",
                boxShadow: "-1px 1px 2px #7a7171",
                "& .MuiSelect-select": {
                  py: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>Metric:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={metric}
              label="Metric"
              onChange={(e) => setMetric(e.target.value)}
              sx={{
                borderRadius: "10px 10px 3px 3px",
                backgroundColor: "#F9F4F4",
                height: "45px",
                border: "none",
                boxShadow: "-1px 1px 2px #7a7171",
                "& .MuiSelect-select": {
                  py: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="overallAverage">Overall</MenuItem>
              <MenuItem value="avgAcademics">Academics</MenuItem>
              <MenuItem value="avgHousing">Housing</MenuItem>
              <MenuItem value="avgLocation">Location</MenuItem>
              <MenuItem value="avgClubs">Clubs</MenuItem>
              <MenuItem value="avgFood">Dining</MenuItem>
              <MenuItem value="avgSocial">Social</MenuItem>
              <MenuItem value="avgOpportunities">Opportunities</MenuItem>
              <MenuItem value="avgSafety">Safety</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>Order:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={order}
              label="Order"
              onChange={(e) => setOrder(e.target.value)}
              sx={{
                borderRadius: "10px 10px 3px 3px",
                backgroundColor: "#F9F4F4",
                height: "45px",
                border: "none",
                boxShadow: "-1px 1px 2px #7a7171",
                "& .MuiSelect-select": {
                  py: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="Best">Best</MenuItem>
              <MenuItem value="Worst">Worst</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>Level:</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              label="Level"
              onChange={(e) => setLevel(e.target.value)}
              sx={{
                borderRadius: "10px 10px 3px 3px",
                backgroundColor: "#F9F4F4",
                height: "45px",
                border: "none",
                boxShadow: "-1px 1px 2px #7a7171",
                "& .MuiSelect-select": {
                  py: "10px",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              {DegreeLevels.map((level, index) => (
                <MenuItem key={index} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>Country:</Typography>
            <Autocomplete
              id="combo-box-demo"
              options={countryOptions}
              defaultValue={countryOptions[0] ?? ""}
              getOptionLabel={(option) => option.label}
              onChange={(_e, newValue) => {
                setCountry(newValue?.value ?? "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Region"
                  sx={{
                    borderRadius: "10px 10px 3px 3px",
                    backgroundColor: "#F9F4F4",
                    height: "45px",
                    border: "none",
                    paddingBottom: "10px",
                    boxShadow: "-1px 1px 2px #7a7171",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              )}
            />
          </FormControl>

          <FormControl
            sx={{
              marginTop: "10px",
              width: { md: "100%", sm: "80%", xs: "65%" },
            }}
          >
            <Typography>Degree:</Typography>
            <Autocomplete
              id="combo-box-demo"
              options={Majors}
              getOptionLabel={(option: string) => option}
              onInputChange={(_e, newInputValue) => {
                setDegree(newInputValue);
              }}
              onChange={(_e, newValue) => {
                setDegree(newValue ?? "");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Field of study"
                  sx={{
                    borderRadius: "10px 10px 3px 3px",
                    backgroundColor: "#F9F4F4",
                    height: "45px",
                    border: "none",
                    paddingBottom: "10px",
                    boxShadow: "-1px 1px 2px #7a7171",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaderboardPage;
