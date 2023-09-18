import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {  addToCart, fetchData } from "./actionsfile";
import { Link, useNavigate } from "react-router-dom";

const Carddata = () => {
  //   ----------------states------------------------
  const [selectedCategory, setSelectedCategory] = useState("");
  const menData = useSelector((state) => state.data.men);
  const womenData = useSelector((state) => state.data.women);
  const kidsData = useSelector((state) => state.data.kids);
  const [emailFilter, setEmailFilter] = useState("");
  const cart = useSelector((state)=> state.data.cart)
  const addToCarts = useSelector((state) => state.data.buy);
  const [SearchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorySortOption = useSelector(
    (state) => state.data.categorySortOption
  );
  // for local storage
  const savedState = localStorage.getItem("reduxState");
  const state = savedState ? JSON.parse(savedState) : {};
  const productPost11 = state.productPost11 || [];
  console.log(productPost11);
  // ---------------handles----------------------
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate(`/cart`);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // filter by email and category
  const handleFilter = (e) => {
    const filter = e.target.value.toLowerCase();
    const filteredItems = productPost11.filter((item) => {
      const emailMatch = item.email.toLowerCase().includes(filter);
      const categoryMatch = item.category.toLowerCase().includes(filter);
      return emailMatch || categoryMatch;
    });
    setEmailFilter(filter);
    setSearchData(filteredItems);
  };
  // ------------show three category --------------------
  const categories = [
    { name: "men", data: menData },
    { name: "women", data: womenData },
    { name: "kids", data: kidsData },
  ];
  const handleCategorySortChange = (event) => {
    const value = event.target.value;
    handleCategoryClick(value);
  };
  let filteredData = [];
  if (selectedCategory) {
    const selectedCategoryData = categories.find(
      (category) => category.name === selectedCategory
    );
    filteredData = selectedCategoryData
      ? Object.entries(selectedCategoryData.data)
      : [];
  } else {
    filteredData = categories.flatMap((category) =>
      Object.entries(category.data)
    );
  }

  return (
    <>
      <Box px={3}>
        {/* ------------------navbar------------------------ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          py={2}
        >
          <Typography fontSize={"30px"} fontWeight={"bold"}>
            Sell Store{" "}
            <Link to="/cartspage">
              <Badge badgeContent={addToCarts.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </Link>
          </Typography>
          <Box display={"flex"} gap="10px">
            <Link to="/login">
              <Button sx={{ background: "#00C6A6", color: "black" }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button sx={{ background: "#00C6A6", color: "black" }}>
                Signup
              </Button>
            </Link>
          </Box>
          <Box display={"flex"} gap={"20px"} alignItems={"center"}>
            <Typography>Search by email and category:</Typography>
            <TextField
              type="search"
              label="Search by email"
              variant="outlined"
              value={emailFilter}
              onChange={handleFilter}
            />

            <Link to="/home" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "#00C6A6",
                  gap: "3px",
                  color: "black",
                  width: "30%",
                  border: "1px solid black",
                  py: 1,
                  px: 2,
                  width: "fit-content",
                  borderRadius: "6px",
                }}
              >
                <AddIcon />
                Sell
              </Box>
            </Link>
          </Box>
        </Box>

        {/* --------------------cards------------------------- */}
        <Box
          py={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid container gap={"30px"}>
            {(emailFilter ? SearchData : productPost11).map((item) => (
              <Card
                key={item.id}
                sx={{
                  width: 345,
                  px: 2,
                  py: 2,
                  boxShadow: "0px 2px 19px 0px rgba(217, 216, 255, 0.83)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: "100%" }}
                    />
                  </Box>
                </CardContent>
                <Typography>category: {item.category}</Typography>
                <Typography py={1} fontWeight={"bold"} variant="h6">
                  {item.title}
                </Typography>
                <Typography py={1}>Price: {item.price}</Typography>
                <Typography py={1}>Address: {item.location}</Typography>
                <Link
                  to={`/selldetails/${item.id}`}
                  style={{ textDecoration: "none", color: "#00C6A6" }}
                >
                  Details
                </Link>
              </Card>
            ))}
          </Grid>
        </Box>

        {/* ----------------shoes--------------------- */}
        <Stack direction={"row"} justifyContent={"space-between"} py={4}>
          <Typography fontWeight={"bold"} fontSize={"30px"}>
            Nike Collection
            <Link to="/cart" >
              <Badge sx={{paddingLeft:'10px'}} badgeContent={cart.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </Link>
          </Typography>
          <select
            style={{ width: "20%", padding: "10px", borderRadius: "5px" }}
            value={categorySortOption}
            onChange={handleCategorySortChange}
          >
            <option value={""}>sort by category</option>
            <option value="">All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </Stack>
        <Grid container gap={"30px"}>
          {filteredData.map(([key, item]) => {
            return (
              <Card
                key={key}
                sx={{
                  width: 345,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent>
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    style={{ width: "100%" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ marginTop: "10px", fontWeight: "bold" }}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price: ${item.price}
                  </Typography>
                  <Typography variant="body2">{item.category}</Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/details/${key}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button sx={{ color: "#00C6A6", fontWeight: "bold" }}>
                      Detail
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    sx={{ color: "#00C6A6", fontWeight: "bold" }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Carddata;
