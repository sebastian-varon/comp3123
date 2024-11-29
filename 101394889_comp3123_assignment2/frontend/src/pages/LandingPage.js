import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(135deg, #1976d2, #2196f3)",
        color: "#fff",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Employee Manager
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Manage your employees efficiently.
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        By: Sebastian Varon - 101394889.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;