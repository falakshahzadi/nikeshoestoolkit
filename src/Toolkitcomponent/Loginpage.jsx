import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import nike from "../Images/nike.png";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "./actionsfile";

const Loginpage = () => {
  const navigate = useNavigate();
  const users = useSelector((state) => state.data.user);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: " ",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = () => {
    const { username, password } = formData;
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!username || !password) {
      setErrors({
        username: username ? "" : "Username cannot be empty",
        password: password ? "" : "Password cannot be empty",
      });
    } else if (matchedUser) {
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials or sign up.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box mt="30px">
      <Container>
        <Typography
          textAlign={"center"}
          py={5}
          fontSize={"30px"}
          fontWeight={"bold"}
        >
          Login Here
        </Typography>
        <Card sx={{ boxShadow: "0px 2px 19px 0px rgba(217, 216, 255, 0.83)" }}>
          <Grid
            container
            gap={{ xs: "15px", sm: "15px", md: "0px", lg: "0px" }}
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            }}
          >
            <Grid item lg={6} xs={10} md={6} sm={10}>
              <img
                src={nike}
                alt="nike"
                width="100%"
                style={{ borderRadius: "6px" }}
              ></img>
            </Grid>
            <Grid
              item
              lg={5}
              xs={10}
              md={5}
              sm={10}
              display={"flex"}
              flexDirection={"column"}
              gap="20px"
              justifyContent={"center"}
              paddingRight={{ lg: "40px", xs: "0px", sm: "0px", md: "30px" }}
            >
              <Typography>Enter name:</Typography>
              <TextField
                label="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <Typography>Enter password:</Typography>
              <TextField
                label="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />

              <Button
                onClick={handleSubmit}
                sx={{
                  background: "#A2C1F0",
                  color: "black",
                  width: "30%",
                  py: 1,
                  borderRadius: "6px",
                  variant: "contained",
                }}
              >
                Login
              </Button>

              <Link to="/signup" style={{ color: "red" }}>
                Sign Up Here
              </Link>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Loginpage;
