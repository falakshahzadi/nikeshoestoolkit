import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Container, Grid, Switch, Typography } from "@mui/material";
import { addToCart, setThemeColor } from "./actionsfile";

const ProductDetail = () => {
  // -------------------states-----------------
  const { key } = useParams();
  const menData = useSelector((state) => state.data.men);
  const womenData = useSelector((state) => state.data.women);
  const kidsData = useSelector((state) => state.data.kids);
  const themeColor = useSelector((state) => state.data.themeColor);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //   -------------handle---------------------
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate(`/cart`);
  };
  const handleThemeToggle = () => {
    const newThemeColor = themeColor === "light" ? "dark" : "light";
    dispatch(setThemeColor(newThemeColor));
  };
  let product;
  const findProductByKey = (data, key) => {
   if(data[key]){
    product =data[key]
   }
   return product;
  }
  product =
  findProductByKey(menData, key) ||
  findProductByKey(womenData, key) ||
  findProductByKey(kidsData, key);
  
if (!product) {
  return (
    <Typography variant="h6">
      Product not found. Please check the URL.
    </Typography>
  );
}

  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Product Detail
        </Typography>
        <Switch onClick={handleThemeToggle}>Toggle Theme</Switch>
        <Card sx={{ width: 900 }}>
          <Grid container justifyContent={"center"} spacing={3}>
            <Grid item lg={6}>
              {" "}
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item lg={6}>
              <Typography
                variant="h6"
                sx={{ marginTop: "10px", fontSize: "40px", fontWeight: "bold" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ marginTop: "10px", fontSize: "25px" }}
              >
                Price: ${product.price}
              </Typography>
              <Typography
                paddingRight={"15px"}
                variant="body2"
                fontSize={"15px"}
                textAlign={"justify"}
                marginTop={"10px"}
              >
                {product.description}
              </Typography>

              <Button
                onClick={() => handleAddToCart(product)}
                sx={{
                  color: "black",
                  background: "#00C6A6",
                  padding: "10px",
                  fontsize: "20px",
                  marginTop: "25px",
                }}
                variant="contained"
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default  ProductDetail