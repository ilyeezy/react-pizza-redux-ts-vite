export type CartItem = {
  id: string | number;
  title: string;
  Price: number;
  imgUrl: string;
  type: string;
  size: number;
  quantity: number;
};

export interface CartSliceState {
  items: CartItem[];
}
