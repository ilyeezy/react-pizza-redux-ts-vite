import { SortPropertyEnum, Sort as SortType } from "../../redux/filter/types";

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type SortPopupProps = {
  value: SortType;
};
