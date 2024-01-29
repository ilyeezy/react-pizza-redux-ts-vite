import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { areItemsEqual } from "../../utils/itemsEqual";

const initialState: CartSliceState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;

      const existingItemIndex = state.items.findIndex((item) =>
        areItemsEqual(item, newItem)
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        const itemWithNewId = { ...newItem, id: Date.now() };
        state.items = [...state.items, itemWithNewId];
      }
    },
    plusItem(state, action: PayloadAction<string | number>) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].quantity++;
      }
    },
    minusItem(state, action: PayloadAction<string | number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.quantity--;
      }
    },
    removeItem(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
