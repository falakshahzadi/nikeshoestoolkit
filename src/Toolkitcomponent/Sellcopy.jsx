import { Textarea } from "@mui/joy";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch } from "react-redux";
import { addProductPost } from "./actionsfile";
import { useNavigate } from "react-router-dom";

const Sellcopy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialFormData = {
    category: "",
    title: "",
    description: "",
    brand: "",
    price: "",
    location: "",
    name: "",
    number: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [imageDataUrl, setImageDataUrl] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = event.target.result;
      setImageDataUrl(imageData);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = () => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = "This field is required";
      }
    }
    if (!imageDataUrl) {
      errors.image = "Please select an image";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    const formDataWithImage = { ...formData, image: imageDataUrl };
    dispatch(addProductPost(formDataWithImage));
    setFormData(initialFormData);
    setImageDataUrl("");
    alert("data is post");
    navigate("/");
  };

  return (
    <Box sx={{ px: 5, py: 2 }}>
      <Typography textAlign={"center"} py={2} fontSize={"26px"}>
        Post Your AD
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ border: "1px solid black" }} py={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={"10px"}
            py={1}
            px={1}
          >
            <h5>Choose Category:</h5>
            <select
              name="category"
              required
              onChange={handleChange}
              style={{ borderRadius: "12px", padding: "10px" }}
            >
              <option value="mobile">Mobiles/Tablets</option>
              <option value="vehicle">Vehicle</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion and beauty">Fashion and beauty</option>
            </select>
          </Stack>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box px={5} py={3}>
            <Typography py={1} fontSize={"22px"} fontWeight={"bold"}>
              Include Some Details
            </Typography>
            <Typography py={1}>Ad Title</Typography>
            <Textarea
              required
              size="sm"
              name="title"
              onChange={handleChange}
              placeholder="Mention the key features of your item (e.g. brand, model, age, type)"
              minRows={2}
              maxRows={4}
            />
            {formErrors.title && (
              <div style={{ color: "red" }}>{formErrors.title}</div>
            )}
            <Typography py={1}>Description</Typography>
            <Textarea
              required
              size="sm"
              onChange={handleChange}
              name="description"
              placeholder="Include condition, features and reason for selling"
              minRows={6}
              maxRows={6}
            />
            {formErrors.description && (
              <div style={{ color: "red" }}>{formErrors.description}</div>
            )}
            <Typography py={1}>Brand</Typography>
            <Textarea
              size="sm"
              name="brand"
              onChange={handleChange}
              placeholder="Brand name (e.g. iphone, oppo, vivo etc)"
              minRows={2}
              maxRows={4}
            />
            {formErrors.brand && (
              <div style={{ color: "red" }}>{formErrors.brand}</div>
            )}
          </Box>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box px={5} py={3}>
            <Typography fontSize={"22px"} fontWeight={"bold"} py={1}>
              Upload Photoes
            </Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
              />
              <AddAPhotoIcon />
            </IconButton>
            {formErrors.image && (
              <div style={{ color: "red" }}>{formErrors.image}</div>
            )}
          </Box>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box px={5} py={3}>
            <Typography py={1} fontSize={"22px"} fontWeight={"bold"}>
              Set A Price
            </Typography>
            <Typography>Price:</Typography>
            <TextField
              name="price"
              placeholder="Rs:"
              type="number"
              onChange={handleChange}
              required
              fullWidth
            ></TextField>
            {formErrors.price && (
              <div style={{ color: "red" }}>{formErrors.price}</div>
            )}
          </Box>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box px={5} py={3}>
            <Typography py={1} fontSize={"22px"} fontWeight={"bold"}>
              Address
            </Typography>
            <TextField
              name="location"
              placeholder="Enter location"
              onChange={handleChange}
              fullWidth
            />
            {formErrors.location && (
              <div style={{ color: "red" }}>{formErrors.location}</div>
            )}
          </Box>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box px={5} py={3}>
            <Typography py={1} fontSize={"22px"} fontWeight={"bold"}>
              Review Your Detail
            </Typography>
            <Typography>Name:</Typography>
            <TextField
              type="text"
              label="name"
              fullWidth
              name="name"
              required
              onChange={handleChange}
            ></TextField>
            {formErrors.name && (
              <div style={{ color: "red" }}>{formErrors.name}</div>
            )}
            <Typography py={1}>Email: </Typography>
            <TextField
              required
              type="email"
              label="email"
              fullWidth
              name="email"
              onChange={handleChange}
            ></TextField>
            {formErrors.email && (
              <div style={{ color: "red" }}>{formErrors.email}</div>
            )}
            <Typography py={1}>Mobile Phone:</Typography>
            <TextField
              type="tel"
              label="Mobile Phone"
              fullWidth
              name="number"
              required
              onChange={handleChange}
            ></TextField>
            {formErrors.number && (
              <div style={{ color: "red" }}>{formErrors.number}</div>
            )}
          </Box>
          <Divider sx={{ backgroundColor: "black" }}></Divider>
          <Box py={3} px={5}>
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{ background: "black", color: "white" }}
              variant="contained"
            >
              Post now
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Sellcopy;
