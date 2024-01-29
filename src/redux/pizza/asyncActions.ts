import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://654a5294e182221f8d52f8fc.mockapi.io/pizza`,
      {
        params: {
          page: currentPage ? currentPage : null,
          limit: 8,
          category: category ? category : null,
          sortBy: sortBy ? sortBy : null,
          order: order ? order : null,
          search: search ? search : null,
        },
      }
    );

    return data;
  }
);
