import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { University } from "../utils/types";
import supabase from "../utils/supabase";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { TabPanel } from "../components/TabPanel";
import TabContent from "../components/TabContent";
import { a11yProps } from "../components/A11yProps";

const UniversityPage = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState<University>();
  const [tabValue, setTabValue] = useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      width="100vw"
      height="calc(100vh - 85px)"
      sx={{
        position: "absolute",
        bottom: 0,
      }}
    >
      {university ? (
        <Box
          marginTop="20px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="10px"
        >
          <Typography
            fontWeight={550}
            sx={{ fontSize: { md: 67, sm: 50, xs: 35 } }}
            color={"primary"}
            textAlign={"center"}
          >
            {university.name}
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="fit-content"
            sx={{
              marginTop: "15px",
              borderBottom: 1,
              borderColor: "divider",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="degree label tabs"
              sx={{ width: "fit-content" }}
            >
              <Tab
                sx={{ fontSize: { md: "16px", sm: "14.5px", xs: "13px" } }}
                label="Undergraduate"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ fontSize: { md: "16px", sm: "14.5px", xs: "13px" } }}
                label="Graduate"
                {...a11yProps(1)}
              />
              <Tab
                sx={{ fontSize: { md: "16px", sm: "14.5px", xs: "13px" } }}
                label="Doctorate"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <TabContent degreeLevel="Undergraduate" university={university} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TabContent degreeLevel="Graduate" university={university} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <TabContent degreeLevel="Doctorate" university={university} />
          </TabPanel>
        </Box>
      ) : (
        <CircularProgress color="primary" />
      )}
    </Box>
  );
};

export default UniversityPage;
