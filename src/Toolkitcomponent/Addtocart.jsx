import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import {
  calculateTotalPrice,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "./actionsfile";

const Addtocart = () => {
  // --------------states------------
  const cart = useSelector((state) => state.data.cart);
  const count = useSelector((state) => state.data.count);
  const totalPrice = useSelector((state) => state.data.totalPrice);
  const dispatch = useDispatch();

  //   -------------------handle---------------

  const handleRemoveFromCart = (productName) => {
    dispatch(removeFromCart(productName));
  };
  const increment = (productName) => {
    dispatch(incrementQuantity(productName));
  };
  const decrement = (productName) => {
    dispatch(decrementQuantity(productName));
  };
  React.useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [cart, count, dispatch]);

  return (
    <Box>
      <Typography
        textAlign={"center"}
        fontSize={"30px"}
        fontWeight={"bold"}
        marginBottom={"25px"}
        marginTop={"10px"}
      >
        My Cart
      </Typography>
      <Container sx={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        {cart.map((item, i) => (
          <Card key={i}>
            <Table>
              <TableHead>
                <TableCell>Products</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
              </TableHead>
              <TableRow>
                <TableCell width="25%">
                  <Stack
                    direction={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    spacing={2}
                  >
                    <ClearIcon
                      onClick={() => handleRemoveFromCart(item.name)}
                    />
                    <img
                      src={item.images[0]}
                      width="100px"
                      style={{ borderRadius: "10px" }}
                    ></img>
                    <Typography fontWeight={"bold"}>{item.name}</Typography>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography fontWeight={"bold"}>${item.price}</Typography>
                </TableCell>

                <TableCell>
                  <Button onClick={() => decrement(item.name)}>-</Button>
                  <span>{count[item.name] || 0}</span>
                  <Button onClick={() => increment(item.name)}>+</Button>
                </TableCell>
                <TableCell>${item.price * (count[item.name] || 0)}</TableCell>
              </TableRow>
            </Table>
          </Card>
        ))}
        <Typography
          textAlign={"right"}
          fontSize={"20px"}
          fontWeight={"bold"}
          marginTop={"20px"}
        >
          Total Price: ${totalPrice}
        </Typography>
      </Container>
    </Box>
  );
};

export default Addtocart;
