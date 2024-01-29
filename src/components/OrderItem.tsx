import { CartItem } from "../redux/cart/types";

export default function OrderItem(props: CartItem) {
  return (
    <div className="orderPage__item">
      <div className="orderPage__item-img">
        <img className="pizza-block__image" src={props.imgUrl} alt="Pizza" />
      </div>
      <div className="orderPage__item-info">
        <h3>{props.title}</h3>
        <p>
          {props.type}, {props.size} см.
        </p>
      </div>

      <div className="orderPage__item-quantity">
        <p>
          <span>Колличество: </span>
          <span>{props.quantity}</span>
        </p>
      </div>
      <div className="orderPage__item-price">
        <b>{Math.round(props.Price) * props.quantity} ₽</b>
      </div>
    </div>
  );
}
