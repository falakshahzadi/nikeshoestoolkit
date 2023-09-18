import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import nike from "../Images/nike.png";
import { login, signUp } from "./actionsfile";

const SignUppage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  const validateForm = () => {
    let isValid = true;
    const { username, password, email } = formData;

    if (!username) {
      setErrors((prevState) => ({
        ...prevState,
        username: "Username cannot be empty.",
      }));
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(username)) {
      setErrors((prevState) => ({
        ...prevState,
        username: "Username should contain only alphabets.",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, username: "" }));
    }

    if (!password) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Password cannot be empty.",
      }));
      isValid = false;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setErrors((prevState) => ({
        ...prevState,
        password:
          "Password should be at least 8 characters and contain a special character.",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, password: "" }));
    }

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Email cannot be empty.",
      }));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Invalid email address.",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, email: "" }));
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(signUp(formData));
      dispatch(login(formData));
      navigate("/login");
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
          Sign Up
        </Typography>
        <Card
          sx={{
            boxShadow: "0px 2px 19px 0px rgba(217, 216, 255, 0.83)",
            width: "fit-content",
          }}
        >
          <Grid
            container
            justifyContent={{
              xs: "center",
              sm: "center",
              md: "space-between",
              lg: "space-between",
            }}
            gap={{ xs: "15px", sm: "15px", md: "0px", lg: "0px" }}
          >
            <Grid item lg={6} xs={11} md={6} sm={8}>
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
              xs={11}
              md={5}
              sm={8}
              display={"flex"}
              flexDirection={"column"}
              gap="20px"
              justifyContent={"center"}
              paddingRight={{ lg: "40px", xs: "0px", sm: "0px", md: "40px" }}
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
              <Typography>Enter email:</Typography>
              <TextField
                type="email"
                name="email"
                label="Email"
                placeholder="email"
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <Button
                onClick={handleSubmit}
                sx={{
                  background: "#A2C1F0",
                  color: "black",
                  width: "30%",
                  py: 1,
                  borderRadius: "6px",
                }}
                variant="contained"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default SignUppage;
