import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

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
  searchPrice: "",
  theme: 'light',

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
        state.count[action.payload.name] = 0;
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.name !== action.payload);
    },
    incrementQuantity(state, action) {
      state.count[action.payload]++;
    },
    decrementQuantity(state, action) {
      state.count[action.payload] = Math.max(
        state.count[action.payload] - 1,
        0
      );
    },
    setCategorySortOption(state, action) {
      state.categorySortOption = action.payload;
    },
    setSearchPrice(state, action) {
      state.searchPrice = action.payload;
    },
    calculateTotalPrice(state) {
      const { cart, count } = state;
      let totalPrice = 0;
      cart.forEach((item) => {
        const quantity = count[item.name] || 0;
        totalPrice += item.price * quantity;
      });
      state.totalPrice = parseFloat(totalPrice.toFixed(2));
    }, 
    setThemeColor: (state, action) => {
      state.themeColor = action.payload;
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
      })
      
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
  setThemeColor
} = dataSlice.actions;

export default dataSlice.reducer;
