export interface IPizzaById {
  title: string;
  id: string | number;
  Price: number;
  type: string[];
  size: number[];
  imgUrl: string;
  description: string;
  category: number;
}

export interface PizzaDetailsState {
  pizza: IPizzaById;
  isLoading: boolean;
}
