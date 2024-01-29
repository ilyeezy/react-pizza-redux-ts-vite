import { CartItem } from "../../redux/cart/types";

type Adress = {
  street: string;
  house: string;
  apartment: string;
  entrance: string;
  floor: string;
};

export interface IOrder {
  id: number | string;
  name: string;
  phone: string;
  address: Adress;
  order: CartItem[];
  typeDelivery: string;
  time: string;
  comment: string;
}
