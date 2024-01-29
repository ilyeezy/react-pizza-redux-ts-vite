import { CartItem } from "../redux/cart/types";

export const calcTotalQuantity = (items: CartItem[]): number => {
  return items.reduce((sum: number, item: any) => sum + item.quantity, 0);
};
