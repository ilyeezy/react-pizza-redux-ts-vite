import React from "react";
import Cart from "../pages/Cart";

import Home from "../pages/Home";

const FullPizza = React.lazy(() => import("../pages/FullPizza"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Order = React.lazy(() => import("../pages/Order"));
const OrderCompleted = React.lazy(() => import("../pages/OrderCompleted"));
export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/pizza/:id",
    component: FullPizza,
  },
  {
    path: "/cart/order",
    component: Order,
  },
  {
    path: "/cart/order/complete-order-page",
    component: OrderCompleted,
  },
  {
    path: "*",
    component: NotFound,
  },
];
