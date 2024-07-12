/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import supabase from "../supabase";
import useWindowDimensions from "../useWindowDimensions";
import { useAuth } from "../AuthProvider";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountPage = () => {
  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(`Error signing out: ${error.message}`);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
  async function handleSignInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://college-ranks-v2.vercel.app",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.log(error.message);
        throw new Error(`Error signing in with Google: ${error.message}`);
      }
      if (data) {
        console.log("works");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="90vh"
    >
      {user ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: {
              xs: 0.65 * width,
              sm: 0.55 * width,
              md: 0.45 * width,
              lg: 0.3 * width,
            },
            height: "275px",
            boxShadow: "-1px 3px 2.5px #797272",
            borderRadius: "13px",
            backgroundColor: "#F9F4F4",
          }}
        >
          <Box
            margin="14px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar alt="User" src={user.user_metadata.picture} />
            <Typography
              fontWeight={550}
              fontSize={24}
              textAlign="center"
              sx={{ marginTop: "5px" }}
            >
              Hi, {user.user_metadata.full_name}
            </Typography>
            <Typography
              fontWeight={450}
              fontSize={20}
              textAlign="center"
              sx={{ marginTop: "5px" }}
            >
              Thank you for using CollegeRanks!
            </Typography>
          </Box>

          <Button
            onClick={() => handleSignOut()}
            sx={{
              width: "85%",
              textDecoration: "none",
              textTransform: "none",
              cursor: "pointer",
              borderRadius: "10px",
              color: "#F9F4F4",
              backgroundColor: theme.palette.primary.main,
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
              marginBottom: "20px",
            }}
          >
            <LogoutIcon fontSize="medium" sx={{ marginX: "5px" }} />
            {!isSmall && "Log out"}
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: {
              xs: 0.65 * width,
              sm: 0.55 * width,
              md: 0.45 * width,
              lg: 0.3 * width,
            },
            height: "275px",
            boxShadow: "-1px 3px 2.5px #797272",
            borderRadius: "13px",
            backgroundColor: "#F9F4F4",
          }}
        >
          <Box margin="14px">
            <Typography fontWeight={550} fontSize={24} textAlign="center">
              Welcome
            </Typography>
            <Typography
              fontWeight={450}
              fontSize={20}
              textAlign="center"
              sx={{ marginTop: "5px" }}
            >
              To review your school, please sign in!
            </Typography>
          </Box>

          <Button
            onClick={() => handleSignInWithGoogle()}
            sx={{
              width: "85%",
              textDecoration: "none",
              textTransform: "none",
              cursor: "pointer",
              borderRadius: "10px",
              color: "#F9F4F4",
              backgroundColor: theme.palette.primary.main,
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
              marginBottom: "20px",
            }}
          >
            <GoogleIcon fontSize="medium" sx={{ marginX: "5px" }} />
            {!isSmall && "Sign in with Google"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountPage;
