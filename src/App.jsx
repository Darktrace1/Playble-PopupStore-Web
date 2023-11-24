import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TopNavigationBar } from "./components/header/topNavigationBar/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  // 이 함수(convertPrice)는 앱 전체에서 쓸거니까 App.jsx 에 선언했다.
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BrowserRouter>
      <TopNavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              setProducts={setProducts}
              convertPrice={convertPrice}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<Product convertPrice={convertPrice} />}
        />
        <Route path="/cart" element={<Basket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
