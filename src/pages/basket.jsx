import { Cart } from "../components/cart/cart";

const Basket = ({ convertPrice, cart, setCart, checkLists, setCheckLists }) => {
  return (
    <Cart
      convertPrice={convertPrice}
      cart={cart}
      setCart={setCart}
      checkLists={checkLists}
      setCheckLists={setCheckLists}
    />
  );
};

export default Basket;
