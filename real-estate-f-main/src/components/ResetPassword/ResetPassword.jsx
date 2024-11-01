import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Typography } from "@mui/material";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    //handle the form submition
    e.preventDefault();

    const res = await fetch("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }),
    });
    const data = await res.json();
    navigate("/login");
    console.log(data);
  };
  return (
    <>
      <Container minwidth="sm" sx={{ paddingTop: 1 }}>
        <Box
          component="section"
          sx={{
            p: 6,
            borderRadius: "16px",
            border: "1px solid",
            borderColor: "primary.main",
            maxWidth: "600px",
            margin: "100px auto",
          }}
        >
          <form onSubmit={handleSubmit} className="form">
            <Stack spacing={3}>
              <Typography variant="h5" align="center">
                Reset Password
              </Typography>
              <TextField
                id="email"
                type="email"
                value={formData.email}
                label="Your Email:"
                variant="outlined"
                onChange={handleChange}
                required
              />
              <TextField
                id="otp"
                type="number"
                value={formData.otp}
                label="otp:"
                variant="outlined"
                onChange={handleChange}
                required
              />

              <TextField
                id="newPassword"
                type="password"
                value={formData.newPassword}
                label="new Password:"
                variant="outlined"
                onChange={handleChange}
                required
              />
              <TextField
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                label="confirm Password:"
                variant="outlined"
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#EFA00F",
                  color: "#fff",
                  padding: "14px 30px",
                }}
              >
                Update
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
};
export default ResetPassword;
