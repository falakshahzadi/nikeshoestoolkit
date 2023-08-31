import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  fetchData,
  setCategorySortOption,
  setSearchPrice,
  setThemeColor,
 
} from "./actionsfile";
import { Link, useNavigate } from "react-router-dom";

const Carddata = () => {
  //   ----------------states------------------------
  const [selectedCategory, setSelectedCategory] = useState("");
  const menData = useSelector((state) => state.data.men);
  const womenData = useSelector((state) => state.data.women);
  const kidsData = useSelector((state) => state.data.kids);
  const themeColor = useSelector((state) => state.data.themeColor);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categorySortOption = useSelector(
    (state) => state.data.categorySortOption
  );
  const searchPrice = useSelector((state) => state.data.searchPrice);


  // ---------------handles----------------------
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    navigate(`/cart`);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleSearchPriceChange = (event) => {
    dispatch(setSearchPrice(event.target.value));
  };
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

const handleThemeToggle = () => {
    const newThemeColor = themeColor === "light" ? "dark" : "light";
    dispatch(setThemeColor(newThemeColor));
  };

  // ------------show three category --------------------
  const categories = [
    { name: "men", data: menData },
    { name: "women", data: womenData },
    { name: "kids", data: kidsData },
  ];
  const handleCategorySortChange = (event) => {
    const value = event.target.value;
    if (value === "AtoZ") {
      dispatch(setCategorySortOption("aToZ"));
    } else if (value === "ZtoA") {
      dispatch(setCategorySortOption("zToA"));
    } else if (value === "lowToHigh") {
      dispatch(setCategorySortOption("lowToHigh"));
    } else if (value === "highToLow") {
      dispatch(setCategorySortOption("highToLow"));
    } else {
      handleCategoryClick(value);
    }
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
  //   -----------switch case fro category-----------------------

  switch (categorySortOption) {
    // ----------ascending order-----------------
    case "aToZ":
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    //   -----------descending order----------------------
    case "zToA":
      filteredData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "lowToHigh":
      filteredData.sort((a, b) => a.price - b.price);
      break;
    case "highToLow":
      filteredData.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
  // -------------price search ------------------------------
  if (searchPrice) {
    filteredData = filteredData.filter((item) => item.price === searchPrice);
  }
  return (
    <div>
      <Container>
        {/* ------------------navbar------------------------ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize={"30px"} fontWeight={"bold"}>
            Fashion Store
          </Typography>
          <Switch onClick={handleThemeToggle}>Toggle Theme</Switch>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
          >
            <TextField
              type="text"
              value={searchPrice}
              onChange={handleSearchPriceChange}
              label="Price"
              variant="outlined"
            />
          </Stack>
          <Stack>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={categorySortOption}
              onChange={handleCategorySortChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
              <MenuItem value="AtoZ">A to Z</MenuItem>
              <MenuItem value="ZtoA">Z to A</MenuItem>
              <MenuItem value="highToLow">High to Low</MenuItem>
              <MenuItem value="lowToHigh">Low to High</MenuItem>
            </Select>
          </Stack>
        </Box>

        {/* --------------------cards------------------------- */}
        <Box
          mt="30px"
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          gap="20px"
          alignItems={"center"}
        >
          {filteredData.map(([key, item]) => {
       
          return(
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
              <Typography variant="h6" sx={{ marginTop: "10px" ,fontWeight:"bold"}}>
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
          )
})}
        </Box>
      </Container>
    </div>
  );
};

export default Carddata;
