import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { University } from "../types";
import supabase from "../supabase";
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
      setUniversity(data);
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
        >
          <Typography
            fontWeight={550}
            sx={{ fontSize: { md: 100, sm: 80, xs: 60 } }}
            color={"primary"}
            textAlign={"center"}
          >
            {university.name}
          </Typography>
          <Typography
            sx={{ fontSize: { md: 60, sm: 40, xs: 30 } }}
            textAlign={"center"}
            color="secondary"
          >
            Overall: {getMetricAverage(university.overallAverage)}
          </Typography>
          <Grid container marginY="15px">
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
                Academics: {getMetricAverage(university.avgAcademics)}
              </Typography>
              <Typography>
                Housing: {getMetricAverage(university.avgHousing)}
              </Typography>
              <Typography>
                Location: {getMetricAverage(university.avgLocation)}
              </Typography>
              <Typography>
                Clubs: {getMetricAverage(university.avgClubs)}
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
                Dining: {getMetricAverage(university.avgFood)}
              </Typography>
              <Typography>
                Social: {getMetricAverage(university.avgSocial)}
              </Typography>
              <Typography>
                Opportunities: {getMetricAverage(university.avgOpportunities)}
              </Typography>
              <Typography>
                Safety: {getMetricAverage(university.avgSafety)}
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
