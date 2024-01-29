import React from "react";
import cs from "./ThxForOrder.module.scss";
import { useNavigate } from "react-router-dom";
export default function ThxForOrder() {
  const navigate = useNavigate();
  return (
    <div className={cs.completedOrder}>
      <div className="container">
        <div className={cs.completedOrder__body}>
          <div className="completedOrder__description">
            <h1>Спасибо за заказ</h1>

            <p>Наш менеджер свяжется с вами для подтверждения заказа</p>
          </div>
          <div className="completedOrder__button">
            <button onClick={() => navigate("/")} className="button">
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
