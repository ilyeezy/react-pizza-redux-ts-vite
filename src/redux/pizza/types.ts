export type Pizza = {
  id: string | number;
  title: string;
  Price: number;
  imgUrl: string;
  size: number[];
  type: string[];
  rating?: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
