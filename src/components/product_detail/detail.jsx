import { useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/fetcher";

export const Detail = ({ convertPrice, cart, setCart }) => {
  const { id } = useParams();
  // 개별 상품에 대한 변수
  const [product, setProduct] = useState({});
  // 상품 갯수에 대한 변수
  const [count, setCount] = useState(1);
  // 상품 증감에 대한 함수
  const handleQuantity = (type) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  // 현재 접속된 페이지에서의 id와
  // 불러온 데이터에서의 id가 같은 것을 찾는 코드
  useEffect(() => {
    /* axios, url이 반복되기 때문에 상수로 두고 axios 객체를 반환받아서 사용 */

    // axios.get("/data/products.json").then((data) => {
    //   setProduct(
    //     data.data.products.find((product) => product.id === parseInt(id))
    //   );
    // });

    getProducts().then((data) => {
      setProduct(
        data.data.products.find((product) => product.id === parseInt(id))
      );
    });
  }, [id]);

  // 장바구니에 담을 때 중복된 물건 있는지 확인
  // 중복된 물건이 있을 경우 해당 물건의 수량만을 수정하는 절차
  const setQuantity = (id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: quantity,
    };

    // 1. 0 ~ idx 직전까지와
    // 2. idx에 해당하는(중복된 물건 자리) 물건
    // 3. 다음 인덱스부터 끝까지
    // 1, 2, 3을 다 더해서 새로운 배열 반환
    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx + 1)]);
  };

  // 장바구니에 담는 함수
  const handleCart = () => {
    const cartItem = {
      id: product.id,
      image: product.image,
      name: product.name,
      price: product.price,
      provider: product.provider,
      quantity: count,
    };

    const found = cart.find((el) => el.id === cartItem.id);
    // 방금 추가한 물건이 이미 장바구니에 있다면 수량만을 추가
    if (found) setQuantity(cartItem.id, found.quantity + count);
    // 그게 아니라면 이전 장바구니와 새롭게 담은 물건을 이어 붙임
    else setCart([...cart, cartItem]);
  };

  console.log(cart);

  // 아래에 AND 연산자 사용한 이유는
  // product가 들어와야 아래가 렌더링 되게끔 하기 위해서
  return (
    product && (
      <>
        <main className={styles.main}>
          <section className={styles.product}>
            <div className={styles.product_img}>
              <img src={product.image} alt="product" />
            </div>
          </section>
          <section className={styles.product}>
            <div className={styles.product_info}>
              <p className={styles.seller_store}>{product.provider}</p>
              <p className={styles.product_name}>{product.name}</p>
              <span className={styles.price}>
                {convertPrice(product.price + "")}
                <span className={styles.unit}>원</span>
              </span>
            </div>

            <div className={styles.delivery}>
              <p>택배배송 / 무료배송</p>
            </div>

            <div className={styles.line}></div>

            <div className={styles.amount}>
              <img
                className={styles.minus}
                src="/images/icon-minus-line.svg"
                alt="minus"
                onClick={() => handleQuantity("minus")}
              />

              <div className={styles.count}>
                <span>{count}</span>
              </div>

              <img
                className={styles.plus}
                src="/images/icon-plus-line.svg"
                alt="plus"
                onClick={() => handleQuantity("plus")}
              />
            </div>

            <div className={styles.line}></div>

            <div className={styles.sum}>
              <div>
                <span className={styles.sum_price}>총 상품 금액</span>
              </div>

              <div className={styles.total_info}>
                <span className={styles.total}>
                  총 수량 <span className={styles.total_count}>{count}개</span>
                </span>
                <span className={styles.total_price}>
                  {convertPrice(count * product.price)}
                  <span className={styles.total_unit}>원</span>
                </span>
              </div>
            </div>

            <div className={styles.btn}>
              <button className={styles.btn_buy}>바로 구매</button>
              <button className={styles.btn_cart} onClick={() => handleCart()}>
                장바구니
              </button>
            </div>
          </section>
        </main>
      </>
    )
  );
};
