import React from "react";
import { areItemsEqual } from "./itemsEqual";
import { CartItem } from "../redux/cart/types";

export function getQuantity(
  items: CartItem[],
  newItem: CartItem
): number | undefined {
  const existingItemIndex = items.findIndex((item) =>
    areItemsEqual(item, newItem)
  );
  if (existingItemIndex !== -1) {
    return items[existingItemIndex].quantity;
  } else {
    return 0;
  }
}
