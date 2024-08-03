import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
  useTheme,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import supabase from "../utils/supabase";
import { Review, University } from "../utils/types";
import { debounce } from "lodash";

interface TabContentProps {
  degreeLevel: string;
  university: University;
}

const TabContent = ({ degreeLevel, university }: TabContentProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getMetricAverage = (values: number[]) => {
    return (
      values.reduce((acc, curr) => acc + curr, 0) / values.length
    ).toFixed(1);
  };

  const fetchReviewsByDegreeLevel = debounce(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Reviews")
      .select("*")
      .eq("universityId", university.id)
      .eq("degreeLevel", degreeLevel);
    if (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
      return;
    }
    setReviews(data as Review[]);
    setLoading(false);
  }, 300);

  useEffect(() => {
    if (university.id) {
      fetchReviewsByDegreeLevel();
    }
  }, [degreeLevel, university.id]);

  useEffect(() => {
    const count = reviews.length;
    if (count > 0) {
      setReviewCount(`${count} Review${count > 1 ? "s" : ""}`);
    } else {
      setReviewCount("No reviews");
    }
  }, [reviews]);

  const overallAverage = useMemo(
    () =>
      reviews.length > 0
        ? `Overall: ${getMetricAverage(reviews.map((r) => r.overall))}`
        : "Overall: N/A",
    [reviews]
  );

  const metrics = useMemo(
    () => [
      { label: "Academics", value: reviews.map((r) => r.academics) },
      { label: "Housing", value: reviews.map((r) => r.housing) },
      { label: "Location", value: reviews.map((r) => r.location) },
      { label: "Clubs", value: reviews.map((r) => r.clubs) },
      { label: "Dining", value: reviews.map((r) => r.food) },
      { label: "Social", value: reviews.map((r) => r.social) },
      { label: "Opportunities", value: reviews.map((r) => r.opportunities) },
      { label: "Safety", value: reviews.map((r) => r.safety) },
    ],
    [reviews]
  );

  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginY="10px"
    >
      <Backdrop
        open={loading}
        sx={{
          color: theme.palette.common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography
        sx={{ fontSize: { md: 40, sm: 28, xs: 20 } }}
        textAlign={"center"}
        color="secondary"
      >
        {overallAverage}
      </Typography>

      <Typography>{reviewCount}</Typography>

      <Grid container width="fit-content" height="fit-content" marginY="10px">
        {metrics.map((metric, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography>
              {metric.value.length > 0
                ? `${metric.label}: ${getMetricAverage(metric.value)}`
                : `${metric.label}: N/A`}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TabContent;
