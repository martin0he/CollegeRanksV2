import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
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
import { useState } from "react";
import { CountryCodes } from "../countries";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const LeaderboardPage = () => {
  const [size, setSize] = useState(10);
  const [metric, setMetric] = useState<string>("Overall");
  const [order, setOrder] = useState<string>("Best");
  const [country, setCountry] = useState<string>(CountryCodes.Global);
  const theme = useTheme();
  const data: ChartData<"bar"> = {
    labels: [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ],
    datasets: [
      {
        label: "Top 10 Universities",
        data: [65.4, 68, 71.2, 73, 75, 78.3, 80.5, 82.7, 85, 87.2],
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top 10 Universities",
      },
    },
  };

  return (
    <Grid container width="100vw" height="75vh" spacing={1} marginTop="25px">
      <Grid
        item
        md={9}
        sm={12}
        xs={12}
        display="flex"
        justifyContent="start"
        alignItems="center"
        flexDirection="column"
        style={{ height: "80%", padding: "10px", marginTop: "30px" }}
      >
        <Bar data={data} options={options} />
      </Grid>
      <Grid
        item
        md={2}
        sm={12}
        xs={12}
        style={{
          padding: "10px",
          margin: "30px 10px",
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
            <MenuItem value={"Overall"}>Overall</MenuItem>
            <MenuItem value={"Academics"}>Academics</MenuItem>
            <MenuItem value={"Housing"}>Housing</MenuItem>
            <MenuItem value={"Location"}>Location</MenuItem>
            <MenuItem value={"Clubs"}>Clubs</MenuItem>
            <MenuItem value={"Dining"}>Dining</MenuItem>
            <MenuItem value={"Social"}>Social</MenuItem>
            <MenuItem value={"Opportunities"}>Opportunities</MenuItem>
            <MenuItem value={"Safety"}>Safety</MenuItem>
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
            <MenuItem value={"Best"}>Best</MenuItem>
            <MenuItem value={"Worst"}>Worst</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          sx={{
            marginTop: "10px",
            width: { md: "100%", sm: "80%", xs: "65%" },
          }}
        >
          <Typography>Country:</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
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
            {Object.entries(CountryCodes).map(([key, value]) => (
              <MenuItem key={value} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LeaderboardPage;
