import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefromCarts } from "./actionsfile";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const addToCarts = useSelector((state) => state.data.buy);
  const totalAmount = addToCarts.reduce((acc, product) => {
    return acc + parseFloat(product.price);
  }, 0);
  const formattedTotalAmount =
    typeof totalAmount === "number" ? totalAmount.toFixed(2) : "0.00";
  const handleCheckout = () => {
    const cartItems = addToCarts.map((product) => product.id);

    const savedState = localStorage.getItem("reduxState");
    if (savedState) {
      const state = JSON.parse(savedState);
      if (state.productPost11) {
        state.productPost11 = state.productPost11.filter(
          (item) => !cartItems.includes(item.id)
        );

        localStorage.setItem("reduxState", JSON.stringify(state));
      }
    }

    addToCarts.forEach((product) => {
      dispatch(removefromCarts(product.id));
    });

    toast.success("Order confirmed!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Box px={3} display={"flex"} flexDirection={"column"} gap={"30px"}>
      <h1>Your Addtocart Products</h1>
      {addToCarts.map((product) => (
        <Card key={product.id}>
          <Table>
            <TableHead>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Brand</TableCell>
            </TableHead>
            <TableRow>
              <TableCell width={"33%"}>
                <ClearIcon
                  onClick={() => dispatch(removefromCarts(product.id))}
                />
                <Stack direction={"row"} alignItems={"center"} gap="10px">
                  {product.title}{" "}
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "20%" }}
                  />
                </Stack>
              </TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.location}</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
          </Table>
        </Card>
      ))}
      <Button
        variant="contained"
        sx={{ background: "red", px: 2, color: "white", width: "10%" }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
      <Typography>Total Amount: ${totalAmount.toFixed(2)}</Typography>
      <ToastContainer />
    </Box>
  );
};

export default CartPage;
