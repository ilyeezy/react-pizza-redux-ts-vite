import { CartItem } from "../redux/cart/types";
import { PizzaSliceState } from "../redux/pizza/types";

export const areItemsEqual = (item1: CartItem, item2: CartItem): Boolean => {
  return (
    item1.title === item2.title &&
    item1.Price === item2.Price &&
    item1.type === item2.type &&
    item1.size === item2.size
  );
};
