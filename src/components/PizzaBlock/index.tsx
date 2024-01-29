import React from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";
import { useAppDispatch } from "../../redux/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getQuantity } from "../../utils/quantity";
import { updateSize } from "../../utils/updateSize";
import { Pizza } from "../../redux/pizza/types";

type PizzaBlockProps = {
  id: string | number;
  title: string;
  Price: number;
  imgUrl: string;
  size: number[];
  type: string[];
  rating?: number;
  index: number;
};

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  Price,
  imgUrl,
  size,
  type,
  index,
}) => {
  const dispatch = useAppDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const { items } = useAppSelector((state) => state.cart);

  const quantity = React.useMemo(() => {
    return getQuantity(items, {
      id,
      title,
      Price: price > 0 ? Math.round(price) : Price,
      imgUrl,
      type: type[activeType],
      size: size[activeSize],
    } as CartItem);
  }, [activeSize, activeType, items]);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      Price: price > 0 ? Math.round(price) : Price,
      imgUrl,
      type: type[activeType],
      size: size[activeSize],
      quantity: 1,
    };

    dispatch(addItem(item));
  };

  React.useEffect(() => {
    updateSize({ size, Price } as Pizza, activeSize, setPrice);
  }, [activeSize]);
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imgUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {type &&
              type.map((typeItem, i) => (
                <li
                  key={i}
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? "active" : ""}
                >
                  {typeItem}
                </li>
              ))}
          </ul>
          <ul>
            {size &&
              size.map((size, i) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(i)}
                  className={activeSize === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            от {price > 0 ? Math.round(price) : Price} ₽
          </div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {quantity && quantity > 0 ? <i>{quantity}</i> : ""}
          </button>
        </div>
      </div>
    </div>
  );
};
