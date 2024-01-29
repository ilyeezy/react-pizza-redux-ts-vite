import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import { Header } from "./components";
import { routes } from "./routes/routes";
import PizzaLoader from "./components/PizzaLoader/PizzaLoader";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<PizzaLoader />}>
                <route.component />
              </Suspense>
            }
          ></Route>
        ))}
      </Routes>
    </div>
  );
}

export default App;
