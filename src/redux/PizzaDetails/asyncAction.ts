import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzaById } from "./types";

export const fetchPizzaById = createAsyncThunk<
  IPizzaById,
  string | number,
  { rejectValue: boolean }
>("pizza/fetchPizzaById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<IPizzaById>(
      `https://654a5294e182221f8d52f8fc.mockapi.io/pizza/${id}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  } catch (error) {
    alert("Ошибка при получении пиццы!");

    return rejectWithValue(true);
  }
});
