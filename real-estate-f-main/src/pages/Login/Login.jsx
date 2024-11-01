import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import { Container } from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  console.log(error);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
       toast.success("You are Logged in")
        navigate("/");
      } else {
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("You aren't Logged out")
      setError("An error occurred. Please try again.");
    }
  };

  return (
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
            <h1 align="center">Login</h1>
            {error && <p className="error-message">{error}</p>}
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
              id="password"
              type="password"
              value={formData.password}
              label="Password:"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexWrap: "nowrap" }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    size="small"
                  />
                }
                label={
                  <span style={{ whiteSpace: "nowrap" }}>Remember me</span>
                }
              />
              <Link to="/forgot-password">
                <span
                  className="forgot-password"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Forgot Password?
                </span>
              </Link>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#EFA00F",
                color: "#fff",
                padding: "14px 30px",
            }}
          >
            
            Login
          </Button>
        </Stack>
      </form>
      <Box component="section" sx={{ marginY: 1, textAlign: "center" }}>
        <span>
          Not registered yet? <Link to="/register">Sign Up</Link>
        </span>
      </Box>
    </Box>
    </Container>
  );
};

export default Login;
