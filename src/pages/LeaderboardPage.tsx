import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
        style={{ height: "80%", padding: "10px", margin: "30px" }}
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
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">No. Schools</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={size}
            label="No. Schools"
            onChange={(e) => setSize(e.target.value as number)}
            sx={{ backgroundColor: "#F9F4F4" }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">Metric</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={metric}
            label="Metric"
            onChange={(e) => setMetric(e.target.value)}
            sx={{ backgroundColor: "#F9F4F4" }}
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

        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="Order"
            onChange={(e) => setOrder(e.target.value)}
            sx={{ backgroundColor: "#F9F4F4" }}
          >
            <MenuItem value={"Best"}>Best</MenuItem>
            <MenuItem value={"Worst"}>Worst</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
            sx={{ backgroundColor: "#F9F4F4" }}
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
