import React from "react";
import ThxForOrder from "../components/ThxForOrder/ThxForOrder";
import PizzaLoader from "../components/PizzaLoader/PizzaLoader";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

export default function OrderCompleted() {
  const [fakeLoading, setFakeLoading] = React.useState(true);
  const { orderStatus } = useAppSelector((state) => state.orderSlice);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (orderStatus !== "complete") {
      navigate("/");
    }
    const fakeLoading = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);
    return () => clearTimeout(fakeLoading);
  }, []);
  return fakeLoading ? <PizzaLoader /> : <ThxForOrder />;
}
