import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPizzaById, PizzaDetailsState } from "./types";
import { fetchPizzaById } from "./asyncAction";

const initialState: PizzaDetailsState = {
  pizza: {} as IPizzaById,
  isLoading: false,
};

const pizzaById = createSlice({
  name: "pizzaById",
  initialState,
  reducers: {
    updatePrice(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzaById.pending, (state) => {
      state.isLoading = true;
      state.pizza = {} as IPizzaById;
    });

    builder.addCase(fetchPizzaById.fulfilled, (state, action) => {
      state.pizza = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchPizzaById.rejected, (state) => {
      state.isLoading = false;
      state.pizza = {} as IPizzaById;
    });
  },
});

export const { updatePrice } = pizzaById.actions;

export default pizzaById.reducer;
