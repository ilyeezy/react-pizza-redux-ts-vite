import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderStatus: "",
};
const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderStatus(state) {
      state.orderStatus = "complete";
    },
  },
});

export const { setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
