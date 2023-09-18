import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
import audi from "../Images/audi.png";
import watches from "../Images/watches.png";
import iphone from "../Images/iphone.png";
import realme from "../Images/realme.png";
import { TroubleshootRounded } from "@mui/icons-material";
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return data;
});

const initialState = {
  men: {},
  women: {},
  kids: {},
  status: "idle",
  error: null,
  cart: [],
  count: {},
  totalPrice: 0,
  categorySortOption: "",
  buy: [],
  user: [
    // {
    //   username: "falak",
    //   password: "falak1234@",
    // },
  ],
  isAuthenticated: true,
  productPosts: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingProduct = state.cart.find(
        (item) => item.name === action.payload.name
      );
      if (!existingProduct) {
        state.cart.push(action.payload);
        state.count[action.payload.name] = 1;
      }
      localStorage.setItem("nikestore", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.name !== action.payload);
      localStorage.setItem("nikestore", JSON.stringify(state));
    },
    incrementQuantity(state, action) {
      state.count[action.payload]++;
      localStorage.setItem("nikestore", JSON.stringify(state));
    },
    decrementQuantity(state, action) {
      state.count[action.payload] = Math.max(
        state.count[action.payload] - 1,
        0
      );
      localStorage.setItem("nikestore", JSON.stringify(state));
    },
    setCategorySortOption(state, action) {
      state.categorySortOption = action.payload;
    },
    calculateTotalPrice(state) {
      const { cart, count } = state;
      let totalPrice = 0;
      cart.forEach((item) => {
        const quantity = count[item.name] || 1;
        totalPrice += item.price * quantity;
      });
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
    },
    signUp: (state, action) => {
      state.user.push(action.payload);
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      if (
        state.user &&
        state.user.username === username &&
        state.user.password === password
      ) {
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    addProductPost: (state, action) => {
      state.productPosts.push(action.payload);
    },
    addToCarts(state, action) {
      const existingProduct = state.buy.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.buy.push(action.payload);
      }
    },
    removefromCarts(state, action) {
      const productIdToRemove = action.payload;
      state.productPosts = state.productPosts.filter(
        (product) => product.id !== productIdToRemove
      );
      state.buy = state.buy.filter(
        (product) => product.id !== productIdToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.men = action.payload.men;
        state.women = action.payload.women;
        state.kids = action.payload.kids;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCategorySortOption,
  setSearchPrice,
  calculateTotalPrice,
  signUp,
  login,
  logout,
  addProductPost,
  removefromCarts,
  addToCarts,
} = dataSlice.actions;
export default dataSlice.reducer;

// {
//   id: 1,
//   image: iphone,
//   category: "Mobiles/Tablets",
//   title: "Iphone 14 pro max 256 GB JV",
//   price: "62000",
//   location: "johar town lahore pakistan",
//   description:
//     "i am selling Iphone 14 pro max 256 GB JV only 1 day used shop slip is available grey colour  with original charger. ",
//   number: "03884866348",
//   brand: "iphone",
//   email: "falak@gmail.com",
// },
// {
//   id: 2,
//   image: audi,
//   category: "vehicle",
//   title: "Audi A3 2015 1.8 Turbo",
//   price: "7,050,000",
//   location: "pahse 1 Islamabad",
//   description:
//     "Audi A3 1.8TFSI 2015 2015 PUNJAB 1.8 TURBOCHARGED ELECTRIC SEATS SPORTS/MANUAL/NORMAL DRIVE MODES    PEDDLE SHIFTERS  POSTURE ADJUSTER     REAR CLIMATE VENTS    DUAL CLIMATE CONTROL  REAR PARKING SENSORS   INTERIOR LIGHTING  AND MUCH MORE! ",
//   number: "030385666",
//   brand: "audi",
//   email: "aeysha@gmail.com",
// },
// {
//   id: 3,
//   image: watches,
//   category: "Fashion and beauty",
//   title: "Original Rolex Onega We Deal",
//   price: "45000",
//   location: "gulistan colony faisalabad ",
//   description:
//     "Most Trusted Name In Swiss Brands Rolex Omega Cartier Chopard Watches We deal All Kind Of Swiss Brands Watches New Or Used Vintage Rare Watches     For More Detail About Your Watch Do Contact Ali Rolex Dealer",
//   number: "0330307356",
//   brand: "rolex",
//   email: "falak@gmail.com",
// },
// {
//   id: 4,
//   image: realme,
//   category: "Mobiles/Tablets",
//   title: " max 256 GB JV",
//   price: "45000",
//   location: "gulistan colony faisalabad ",
//   description:
//     "i am selling Iphone 14 pro max 256 GB JV only 1 day used shop slip is available grey colour  with original charger.",
//   number: "0330307356",
//   brand: "redmi",
//   email: "aeysha@gmail.com",
// },
