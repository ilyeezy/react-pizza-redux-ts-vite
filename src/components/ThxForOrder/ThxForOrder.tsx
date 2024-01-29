import React from "react";
import cs from "./ThxForOrder.module.scss";
export default function ThxForOrder() {
  return (
    <div className={cs.completedOrder}>
      <div className="container">
        <div className="completedOrder__body">
          <h1>Спасибо за заказ</h1>
          <div className="completedOrder__description">
            <p>Наш менеджер свяжется с вами для подтверждения заказа</p>
          </div>
        </div>
      </div>
    </div>
  );
}
