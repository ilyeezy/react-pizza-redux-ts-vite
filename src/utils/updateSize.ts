import { Dispatch, SetStateAction } from "react";
import { Pizza } from "../redux/pizza/types";

export const updateSize = (
  pizza: Pizza,
  activeSize: number,
  setPrice: Dispatch<SetStateAction<number>>
): void => {
  switch (pizza.size[activeSize]) {
    case 25:
      setPrice(pizza.Price);
      break;
    case 30:
      setPrice(pizza.Price * 1.3);
      break;
    case 35:
      setPrice(pizza.Price * 1.6);
      break;
    default:
      setPrice(pizza.Price);
      break;
  }
};
