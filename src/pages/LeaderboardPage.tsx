/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
import { CountryCodes } from "../countries";
import { University } from "../types";
import supabase from "../supabase";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
const LeaderboardPage: React.FC = () => {
  const [size, setSize] = useState<number>(10);
  const [metric, setMetric] = useState<string>("overallAverage");
  const [order, setOrder] = useState<string>("Best");
  const [country, setCountry] = useState<string>(CountryCodes.Global);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: [],
  });

  const theme = useTheme();

  const fetchUniversities = async () => {
    let query = supabase
      .from("Universities")
      .select("name, " + metric)
      .eq("countryCode", country);

    if (order === "Best") {
      query = query.order(metric, { ascending: false });
    } else {
      query = query.order(metric, { ascending: true });
    }

    query = query.limit(size);

    const { data, error } = await query;
    if (error) {
      console.error(error);
    } else {
      console.log(data); // Log the data to see the structure
      const labels = data.map((university: any) => university.name);
      const values = data.map((university: any) => {
        const metricArray = university[metric as keyof University] as number[];
        if (Array.isArray(metricArray) && metricArray.length > 0) {
          const average =
            metricArray.reduce((acc, val) => acc + val, 0) / metricArray.length;
          return average;
        }
        return 0;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: `${order} ${size} Universities by ${metric}`,
            data: values,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.dark,
            borderWidth: 1,
          },
        ],
      });
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [size, metric, order, country]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${order} ${size} Universities by ${metric}`,
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
        <Bar data={chartData} options={options} />
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
