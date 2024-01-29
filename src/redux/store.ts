import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from "./pizza/slice";
import { useDispatch } from "react-redux";
import pizzaById from "./PizzaDetails/slice";
import orderSlice from "./opder/slice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    pizzaById,
    orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
