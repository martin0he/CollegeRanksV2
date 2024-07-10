import { Box } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      height="70px"
      sx={{
        width: "100%",
        boxShadow: "-1px 2px 3px #7d6868",
        backgroundColor: "#f1dede",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></Box>
  );
};

export default Navbar;
