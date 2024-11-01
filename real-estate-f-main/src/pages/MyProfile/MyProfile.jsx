import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserProfile,
  removeProfile,
  updateProfile,
} from "../../redux/userSlice";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  TableContainer,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { motion } from "framer-motion";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  maxWidth: "900px",
  width: "100%",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleRemoveProfile = (user) => {
    dispatch(removeProfile(user));
    dispatch(fetchUserProfile());
  };

  const handleUpdateProfile = () => {
    dispatch(updateProfile(user));
    dispatch(fetchUserProfile());
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>No user data available.</Typography>;

  return (
    <Box
      sx={{ padding: { xs: 2, md: 4 }, maxWidth: "1200px", margin: "0 auto" }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        My Profile
      </Typography>

      <TableContainer
        component={StyledPaper}
        sx={{ boxShadow: 3, borderRadius: "16px", overflow: "hidden" }}
      >
        <Box
          sx={{
            padding: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            color: (theme) =>
              theme.palette.mode === "light" ? "#000" : "#fff",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}  // Start slightly lower and transparent
            animate={{ opacity: 1, y: 0 }}   // Animate to normal position
            transition={{ duration: 0.5 }}     // Animation duration
          >
            <Box>
              {/* Avatar Section */}
              <ProfileImage />

              <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <TextField
                  label="Email"
                  defaultValue={user.email || "No Email Provided"}
                  fullWidth
                  disabled
                  margin="normal"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="User Name"
                  defaultValue={user.username || "No Name Provided"}
                  fullWidth
                  margin="normal"
                  sx={{ flex: 1 }}
                />

                <TextField
                  label="Phone Number"
                  defaultValue={user.phoneNumber || "No Phone Provided"}
                  fullWidth
                  margin="normal"
                  sx={{ flex: 1 }}
                />
              </Box>
              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#21616A",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#56AEB1" },
                    px: 4,
                    py: 1.5,
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </Button>
              </Box>

              {/* Account Settings Section */}

              <Box
                sx={{
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  mb: 4,
                  mt: 4,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    color: (theme) =>
                      theme.palette.mode === "light" ? "#000" : "#fff",
                  }}
                >
                  User Account
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    color: (theme) =>
                      theme.palette.mode === "light" ? "#000" : "#fff",
                  }}
                >
                  Your current account type is set to user. If you want to
                  remove your user account, and return to normal account, you
                  must click the button below.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  sx={{
                    backgroundColor: "#21616A",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#56AEB1" },
                  }}
                  onClick={() => handleRemoveProfile(user._id)}
                >
                  Remove User Account
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default MyProfile;
