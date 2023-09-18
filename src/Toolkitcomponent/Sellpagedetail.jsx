import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCarts } from "./actionsfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sellpagedetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // For local storage
  const savedState = localStorage.getItem("reduxState");
  const state = savedState ? JSON.parse(savedState) : {};
  const productPost11 = state.productPost11 || [];
  const productId = id.toString();
  const product = productPost11.find((item) => item.id === productId);

  if (!product) {
    return (
      <Box>
        <Typography>Product not found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      mt="30px"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
        py: 2,
      }}
    >
      <Typography fontSize={"30px"} fontWeight={"bold"} py={1}>
        {product.title}
      </Typography>
      <Card
        sx={{
          px: 2,
          py: 2,
          width: "60%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "0px 2px 19px 0px rgba(217, 216, 255, 0.83)",
        }}
      >
        <Box>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%" }}
          />
        </Box>
      </Card>
      <Box
        display={"flex"}
        flexDirection={"column"}
        border={"1px solid #D3D3D3"}
        px={2}
        py={2}
        width={"60%"}
        borderRadius={"5px"}
      >
        <Typography fontSize={"30px"}>RS: {product.price}</Typography>
        <Typography py={1} fontSize={"18px"}>
          {product.title}
        </Typography>
        <Typography fontWeight={"bold"} fontSize={"18px"}>
          Address: {product.location}
        </Typography>
        <Typography fontWeight={"bold"} fontSize={"18px"}>
          Telephone: {product.number}
        </Typography>
        <Typography>Email: {product.email}</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        border={"1px solid #D3D3D3"}
        px={2}
        py={2}
        width={"60%"}
        borderRadius={"5px"}
      >
        <Typography fontSize={"30px"}>Description</Typography>
        <Typography py={1}>Brand: {product.brand}</Typography>
        <Typography py={1}>{product.description}</Typography>
      </Box>
      <Link to={"/cartspage"}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#00C6A6", px: 5, color: "black" }}
          onClick={() => {
            dispatch(addToCarts(product));
          }}
        >
          Buy
        </Button>
      </Link>
      <ToastContainer />
    </Box>
  );
};

export default Sellpagedetail;
