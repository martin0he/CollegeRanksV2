import { Grid, Typography, useTheme } from "@mui/material";
import { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const LeaderboardPage = () => {
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
        backgroundColor: theme.palette.primary.main,
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
    <Grid container width="90vw" height="75vh" spacing={1} marginTop="25px">
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
        style={{ padding: "10px", margin: "30px 10px" }}
      >
        <Typography>test</Typography>
      </Grid>
    </Grid>
  );
};

export default LeaderboardPage;
