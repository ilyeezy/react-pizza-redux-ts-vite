import { CartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce(
    (sum, obj) => Math.round(obj.Price) * obj.quantity + sum,
    0
  );
};
