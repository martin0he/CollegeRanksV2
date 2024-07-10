import {
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowDimensions from "../useWindowDimensions";
import { useState } from "react";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 680;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Box
          sx={{
            width: 250,
            height: "100%",
            backgroundColor: theme.palette.background.default,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          }}
          role="presentation"
          onClick={() => setIsMenuOpen(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Link href="/" sx={{ textDecoration: "none" }}>
                  <ListItemText primary="home" />
                </Link>
              </ListItemButton>
            </ListItem>
            {["leaderboard", "review", "account"].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <Link href={`/${text}`} sx={{ textDecoration: "none" }}>
                    <ListItemText primary={text} />
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {isSmallScreen ? (
        <Box
          display="flex"
          height="70px"
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            right: 0,
          }}
        >
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            sx={{
              position: "absolute",
              right: "15px",
              top: "15px",
              fontsize: 28,
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          height="70px"
          marginTop="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <Link
            href="/"
            sx={{
              display: "inline-block",
              padding: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Typography fontSize={28}>home</Typography>
          </Link>
          <Link
            href="/leaderboard"
            sx={{
              display: "inline-block",
              padding: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Typography fontSize={28}>leaderboard</Typography>
          </Link>
          <Link
            href="/review"
            sx={{
              display: "inline-block",
              padding: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Typography fontSize={28}>review</Typography>
          </Link>
          <Link
            href="/account"
            sx={{
              display: "inline-block",
              padding: "20px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            <Typography fontSize={28}>account</Typography>
          </Link>
        </Box>
      )}
    </>
  );
};

export default Navbar;
