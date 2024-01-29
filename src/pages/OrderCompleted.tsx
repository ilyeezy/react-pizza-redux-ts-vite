import React from "react";
import ThxForOrder from "../components/ThxForOrder/ThxForOrder";
import PizzaLoader from "../components/PizzaLoader/PizzaLoader";

export default function OrderCompleted() {
  const [fakeLoading, setFakeLoading] = React.useState(true);
  React.useEffect(() => {
    const fakeLoading = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);
    return () => clearTimeout(fakeLoading);
  }, []);
  return fakeLoading ? <PizzaLoader /> : <ThxForOrder />;
}
