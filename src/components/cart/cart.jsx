import { useState } from "react";
import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";

export const Cart = ({
  convertPrice,
  cart,
  setCart,
  checkLists,
  setCheckLists,
}) => {
  // 장바구니에서 물건 체크
  // Cart.jsx에 만들어두면 다른 페이지 다녀왔을 때 checkLists 배열이 새로 만들어지면서 초기화된다.
  // -> 그러니까 App.jsx에 만들어두어야 함
  // const [checkLists, setCheckLists] = useState([]);

  // 장바구니에서 선택된 상품의 가격을 위한 변수
  const [total, setTotal] = useState(0);

  // 장바구니에서 수량 조절하는 함수
  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: found.id,
      image: found.image,
      name: found.name,
      price: found.price,
      quantity: quantity,
      provider: found.provider,
    };

    if (type === "plus") {
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    } else {
      if (quantity === 0) return;
      setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
    }
  };

  // 장바구니에서 물건 삭제하는 함수
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id));
    setCheckLists(checkLists.filter((check) => check !== id));
  };

  // 장바구니에서 물건 체크하는 함수
  const handleCheckList = (checked, id) => {
    if (checked) {
      setCheckLists([...checkLists, id]);
    } else {
      setCheckLists(checkLists.filter((check) => check !== id));
    }
  };

  // 장바구니에서 모두 선택하는 함수
  const handleAllCheck = (checked) => {
    if (checked) {
      const checkItems = [];
      cart.map((cart) => checkItems.push(cart.id));
      setCheckLists(checkItems);
    } else {
      setCheckLists([]);
    }
  };

  // 장바구니와 모두선택 간의 조화를 위함
  const isAllChecked =
    cart.length === checkLists.length && checkLists.length !== 0;

  // 선택된 상품의 정보(가격, 판매자 등등)를 담는 변수
  const found = checkLists.map((checkList) =>
    cart.filter((el) => el.id === checkList)
  );

  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked} />
      {/* 장바구니에 담은게 없으면 CartList 안 뜨게 하기 */}
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
      ) : (
        cart.map((cart) => {
          return (
            <CartList
              key={`key-${cart.id}`}
              cart={cart}
              checkLists={checkLists}
              convertPrice={convertPrice}
              handleQuantity={handleQuantity}
              handleRemove={handleRemove}
              handleCheckList={handleCheckList}
            />
          );
        })
      )}
      {/* 장바구니에 담은게 없으면 TotalCart도 안 뜨게 하기 */}
      {cart.length === 0 ? (
        ""
      ) : (
        <TotalCart
          convertPrice={convertPrice}
          total={total}
          setTotal={setTotal}
          found={found}
          cart={cart}
        />
      )}
    </>
  );
};
