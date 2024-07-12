import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { University } from "../utils/types";
import supabase from "../utils/supabase";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

const UniversityPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState<University>();

  useEffect(() => {
    const fetchUniversityData = async () => {
      const { data, error } = await supabase
        .from("Universities")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching university:", error);
        return;
      }
      setUniversity(data as University);
    };

    if (id) {
      fetchUniversityData();
    }
  }, [id]);

  const getMetricAverage = (values: number[]) => {
    return (
      values.reduce((acc, curr) => acc + curr, 0) / values.length
    ).toFixed(1);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      width="100vw"
      height="100%"
    >
      {university ? (
        <Box
          marginTop="60px"
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <Typography
            fontWeight={550}
            sx={{ fontSize: { md: 85, sm: 70, xs: 60 } }}
            color={"primary"}
            textAlign={"center"}
          >
            {university.name}
          </Typography>
          <Typography
            sx={{ fontSize: { md: 50, sm: 40, xs: 30 } }}
            textAlign={"center"}
            color="secondary"
          >
            {university.overallAverage
              ? `Overall: ${getMetricAverage(university.overallAverage)}`
              : "Overall: N/A"}
          </Typography>
          <Grid container marginY="30px">
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
            >
              <Typography>
                {university.avgAcademics
                  ? `Academics: ${getMetricAverage(university.avgAcademics)}`
                  : "Academics: N/A"}
              </Typography>
              <Typography>
                {university.avgHousing
                  ? `Housing: ${getMetricAverage(university.avgHousing)}`
                  : "Housing: N/A"}
              </Typography>
              <Typography>
                {university.avgLocation
                  ? `Location: ${getMetricAverage(university.avgLocation)}`
                  : "Location: N/A"}
              </Typography>
              <Typography>
                {university.avgClubs
                  ? `Clubs: ${getMetricAverage(university.avgClubs)}`
                  : "Clubs: N/A"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alignItems="center"
            >
              <Typography>
                {university.avgFood
                  ? `Dining: ${getMetricAverage(university.avgFood)}`
                  : "Dining: N/A"}
              </Typography>
              <Typography>
                {university.avgSocial
                  ? `Social: ${getMetricAverage(university.avgSocial)}`
                  : "Social: N/A"}
              </Typography>
              <Typography>
                {university.avgOpportunities
                  ? `Opportunities: ${getMetricAverage(
                      university.avgOpportunities
                    )}`
                  : "Opportunities: N/A"}
              </Typography>
              <Typography>
                {university.avgSafety
                  ? `Safety: ${getMetricAverage(university.avgSafety)}`
                  : "Safety: N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CircularProgress color="primary" />
      )}
    </Box>
  );
};

export default UniversityPage;
