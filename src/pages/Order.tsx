import React, { SetStateAction } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { CartItem } from "../components";
import OrderItem from "../components/OrderItem";
import { calcTotalPrice } from "../utils/calcTotalPrice";
import { calcTotalQuantity } from "../utils/calcTotalQuantity";
import { useNavigate } from "react-router-dom";
import { IOrder } from "../types/order/intex";
import { useAppDispatch } from "../redux/store";
import { setOrderStatus } from "../redux/opder/slice";
import { clearItems } from "../redux/cart/slice";

export default function Order() {
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = calcTotalPrice(items);
  const totalQuantity = calcTotalQuantity(items);
  const [activeTypeDelivery, setActiveTypeDelivery] = React.useState(0);
  const typesDelivery = ["Самовывоз", "Доставка"];
  const [time, setTime] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState<IOrder>({
    id: Date.now(),
    name: "",
    phone: "",
    address: {
      street: "",
      house: "",
      apartment: "",
      entrance: "",
      floor: "",
    },
    order: [],
    typeDelivery: "",
    time: "",
    comment: "",
  });

  function generateDeliveryTimeOptions() {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    const deliveryTimeOptions = [];
    while (
      deliveryTime.getHours() < 22 ||
      (deliveryTime.getHours() === 22 && deliveryTime.getMinutes() <= 30)
    ) {
      deliveryTimeOptions.push(
        deliveryTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      deliveryTime.setMinutes(deliveryTime.getMinutes() + 25);
    }
    setTime(deliveryTimeOptions);
    return deliveryTimeOptions;
  }

  React.useEffect(() => {
    setInterval(() => {
      generateDeliveryTimeOptions();
    }, 300000);
  }, []);

  React.useEffect(() => {
    if (!items.length) {
      navigate("/");
    }
    generateDeliveryTimeOptions();
    setOrder({ ...order, order: items });
  }, []);

  function submitOrder() {
    dispatch(setOrderStatus());
    dispatch(clearItems());
    navigate("/cart/order/complete-order-page");
  }
  return (
    <div className="orderPage">
      <div className="container">
        <div className="orderPage__body">
          <div className="orderPage__order">
            <h1 className="orderPage__title">Ваш заказ</h1>
            <div className="orderPage__items-body">
              <div className="content__items ">
                {items.map((item: any) => (
                  <OrderItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <div className="orderPage__form-body">
              <form action="" className="orderPage__form">
                <div className="orderPage__form-client">
                  <h3>Информация о вас</h3>
                  <div className="orderPage__form-client_inputs">
                    <input
                      onChange={(e) =>
                        setOrder({ ...order, name: e.target.value })
                      }
                      type="text"
                      placeholder="Введите имя"
                    />
                    <input
                      onChange={(e) =>
                        setOrder({ ...order, phone: e.target.value })
                      }
                      type="text"
                      placeholder="Ваш номер телефона"
                    />
                  </div>
                </div>
                <div className="orderPage__form-selector">
                  <h3>Выберите способ доставки</h3>
                  <div className="orderPage__form-radio-group">
                    {typesDelivery.map((el, i) => (
                      <div
                        key={i}
                        className={
                          activeTypeDelivery === i
                            ? [
                                "orderPage__form-selector_item-active",
                                "orderPage__form-selector_item",
                              ].join(" ")
                            : "orderPage__form-selector_item"
                        }
                        onClick={() => setActiveTypeDelivery(i)}
                      >
                        <input
                          id={`radio-${i}`}
                          type="radio"
                          name="radio"
                          value={el}
                          checked={order.typeDelivery === el}
                          onChange={(e) =>
                            setOrder({ ...order, typeDelivery: e.target.value })
                          }
                        />
                        <label htmlFor={`radio-${i}`}>{el}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="orderPage__form-adress_body">
                  <h3>Укажите свой адресс доставки</h3>
                  <div className="orderPage__form-adress">
                    <div className="orderPage__form-adress_item">
                      <input
                        placeholder="Улица"
                        onChange={(e) =>
                          setOrder({
                            ...order,
                            address: {
                              ...order.address,
                              street: e.target.value,
                            },
                          })
                        }
                        type="text"
                      />
                    </div>
                    <div className="orderPage__form-adress_item">
                      <input
                        onChange={(e) =>
                          setOrder({
                            ...order,
                            address: {
                              ...order.address,
                              house: e.target.value,
                            },
                          })
                        }
                        placeholder="Дом"
                        type="text"
                      />
                    </div>
                    <div className="orderPage__form-adress_item">
                      <input
                        onChange={(e) =>
                          setOrder({
                            ...order,
                            address: {
                              ...order.address,
                              apartment: e.target.value,
                            },
                          })
                        }
                        placeholder="Квартира"
                        type="text"
                      />
                    </div>
                    <div className="orderPage__form-adress_item">
                      <input
                        onChange={(e) =>
                          setOrder({
                            ...order,
                            address: {
                              ...order.address,
                              entrance: e.target.value,
                            },
                          })
                        }
                        placeholder="Подъезд"
                        type="text"
                      />
                    </div>
                    <div className="orderPage__form-adress_item">
                      <input
                        onChange={(e) =>
                          setOrder({
                            ...order,
                            address: {
                              ...order.address,
                              floor: e.target.value,
                            },
                          })
                        }
                        placeholder="Этаж"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="orderPage__form-time">
                  <h3>Время доставки</h3>
                  <select
                    onChange={(e) =>
                      setOrder({ ...order, time: e.target.value })
                    }
                  >
                    <option value="Ближайшее время">
                      Ближайшее время доставки
                    </option>
                    {time.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="orderPage__form-comment">
                  <h3>Комментарий к заказу</h3>
                  <textarea
                    onChange={(e) =>
                      setOrder({ ...order, comment: e.target.value })
                    }
                    placeholder="Комментарий к заказу"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>

          <div className="orderPage__pay">
            <div className="orderPage__pay-totalPrice">
              <p>Итого:</p>
              <b>{totalPrice} ₽</b>
            </div>
            <div className="orderPage__pay-totalCount">
              <p>Количество:</p>
              <b>{totalQuantity}</b>
            </div>
            <div className="orderPage__pay-button">
              <button onClick={submitOrder} className="button">
                Оплатить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
