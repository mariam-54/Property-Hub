import { useState } from "react";
import { TextField, Stack, Box, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      sessionStorage.setItem("token", data.token);
      toast.success("You are Registerd Now")
      navigate("/");
    } catch (err) {
      setError(err.message);
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
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <h1 align="center">Registration</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {[
              "username",
              "email",
              "password",
              "confirmPassword",
              "phoneNumber",
            ].map((field, index) => (
              <TextField
                key={index}
                id={field}
                type={field.includes("password") ? "password" : "text"}
                label={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                variant="outlined"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#EFA00F",
                color: "#fff",
                padding: "14px 30px",
              }}
            >
              Register
            </Button>
          </Stack>
        </form>
        <Box component="section" sx={{ marginY: 1, textAlign: "center" }}>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
