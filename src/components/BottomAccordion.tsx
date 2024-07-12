import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface BottomAccordionProps {
  title: string;
  content: string;
}

const BottomAccordion = ({ title, content }: BottomAccordionProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "33svw",
        zIndex: 1000,
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
      }}
    >
      <Accordion
        sx={{
          width: "fit-content",
          backgroundColor: "transparent",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
          borderRadius: "16px 16px 0 0",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandLessIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            backgroundColor: "#dfd4c8",

            "&:hover": {
              backgroundColor: "#d9caba",
            },
            "&.Mui-expanded": {
              backgroundColor: "#dfd4c8",
            },
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Typography padding="2px">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#dfd4c8",
          }}
        >
          <Typography height="fit-content" padding="2px">
            {content}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BottomAccordion;
