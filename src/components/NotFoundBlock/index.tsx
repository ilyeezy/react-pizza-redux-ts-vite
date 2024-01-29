import React from "react";

import styles from "./NotFoundBlock.module.scss";
import { useNavigate } from "react-router-dom";

export const NotFoundBlock: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует
      </p>
      <button onClick={() => navigate("/")}>На главную</button>
    </div>
  );
};
