import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Typography } from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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

    const res = await fetch("/auth/forget-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
      }),
    });
    const data = await res.json();
    navigate("/reset-password");
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
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Forgot Password
              </Typography>
              {/* <label htmlFor="email">Your Email:</label> */}
              <TextField
                id="email"
                type="email"
                value={formData.email}
                label="Your Email:"
                variant="outlined"
                onChange={handleChange}
                required
              />
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              ></Stack>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  background: "#EFA00F",
                  color: "#fff",
                  padding: "14px 30px",
              }}
              >
                Send Code
              </Button>
            </Stack>
          </form>
          <Box component="section" sx={{ marginY: 1, textAlign: "center" }}>
            <Link to="/login">
              <Typography variant="body">Go Back to login</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default ForgotPassword;
