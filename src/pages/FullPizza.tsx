import React from "react";

import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../redux/store";
import { fetchPizzaById } from "../redux/PizzaDetails/asyncAction";
import { addItem } from "../redux/cart/slice";
import { CartItem } from "../redux/cart/types";
import PizzaLoader from "../components/PizzaLoader/PizzaLoader";
import { getQuantity } from "../utils/quantity";
import { categories } from "../utils/constants/categories";
import { setActiveSize, setActiveType } from "../redux/filter/slice";
import { updateSize } from "../utils/updateSize";

const FullPizza: React.FC = () => {
  const { pizza, isLoading } = useAppSelector((state) => state.pizzaById);
  const { items } = useAppSelector((state) => state.cart);
  const { activeType, activeSize } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [price, setPrice] = React.useState<number>(0);
  const count = React.useMemo(() => {
    if (pizza) {
      return getQuantity(items, {
        id: pizza?.id,
        title: pizza?.title,
        Price: price > 0 ? Math.round(price) : pizza.Price,
        imgUrl: pizza?.imgUrl,
        type: pizza.type !== undefined ? pizza.type[activeType] : "",
        size: pizza.size !== undefined ? pizza.size[activeSize] : "",
      } as CartItem);
    }
  }, [activeSize, activeType, items]);

  function onAddItem() {
    const item: CartItem = {
      id: pizza.id,
      title: pizza.title,
      Price: price > 0 ? Math.round(price) : pizza.Price,
      imgUrl: pizza.imgUrl,
      type: pizza.type[activeType],
      size: pizza.size[activeSize],
      quantity: 1,
    };
    dispatch(addItem(item));
  }

  React.useEffect(() => {
    if (id) {
      dispatch(fetchPizzaById(id));
    }
  }, []);

  React.useEffect(() => {
    if (pizza.size !== undefined) {
      updateSize(pizza, activeSize, setPrice);
    }
  }, [activeSize]);

  if (isLoading) {
    return <PizzaLoader />;
  }

  return (
    <div className="container">
      <div className="pizzaDetail">
        <div className="pizzaDetail__body">
          <div className="pizzaDetail__img-block">
            <img src={pizza.imgUrl} alt={pizza.title} />
          </div>
          <div className="pizzaDetail__info">
            <div className="pizzaDetail__title">
              <h1>{pizza.title}</h1>
            </div>
            <div className="pizzaDetail__category">
              <b>{categories[pizza.category]}</b>
            </div>
            <div className="pizzaDetail__description">
              <p>{pizza.description}</p>
            </div>
            <div className="selector">
              <ul>
                {pizza.type &&
                  pizza.type.map((typeItem, i) => (
                    <li
                      key={i}
                      onClick={() => dispatch(setActiveType(i))}
                      className={activeType === i ? "active" : ""}
                    >
                      {typeItem}
                    </li>
                  ))}
              </ul>
              <ul>
                {pizza.size &&
                  pizza.size.map((size, i) => (
                    <li
                      key={size}
                      onClick={() => dispatch(setActiveSize(i))}
                      className={activeSize === i ? "active" : ""}
                    >
                      {size} см.
                    </li>
                  ))}
              </ul>
            </div>
            <div className="pizzaDetail__price">
              <p>от {price > 0 ? Math.round(price) : pizza.Price} ₽</p>
              <button
                onClick={onAddItem}
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
                {count && count > 0 ? <i>{count}</i> : ""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
