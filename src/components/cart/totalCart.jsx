import { useEffect } from "react";
import styles from "./cart.module.css";

export const TotalCart = ({
  convertPrice,
  total,
  setTotal,
  totalCount,
  setTotalCount,
  found,
  cart,
}) => {
  useEffect(() => {
    if (found) {
      const sum = found.map((item) => item[0].price * item[0].quantity);
      const reducer = (acc, cur) => acc + cur;

      // 배열에 있는 값이 없을 경우 더하지 않아도 되니 그대로 반환
      if (sum.length === 0) {
        setTotal(0);
        setTotalCount(0);
        return;
      }

      // 모든 배열에 있는 값을 더하는 함수
      const itemTotal = sum.reduce(reducer);
      setTotal(itemTotal);
      setTotalCount(sum.length);
    } else {
      // 체크된게 없다면?
      setTotal(0);
    }
  }, [cart, found, total, setTotal, setTotalCount]);

  return (
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}>총 상품금액</p>
        <p className={styles.cart_product_price}>{convertPrice(total)}</p>
      </div>
      <div className={styles.pay_minus}>
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className={styles.sale}>
        <p className={styles.cart_product_sale}>상품 할인</p>
        <p className={styles.cart_product_sale_price}>0원</p>
      </div>
      <div className={styles.pay_plus}>
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className={styles.delivery}>
        <p className={styles.cart_product_delivery}>배송비</p>
        <p className={styles.cart_product_delivery_price}>0원</p>
      </div>
      <div className={styles.payment}>
        <p className={styles.cart_product_payment}>결제 예정 금액</p>
        <p className={styles.cart_product_payment_price}>
          {convertPrice(total)}
        </p>
      </div>
      <div className={styles.btn_total}>
        <button className={styles.btn_total_submit}>
          <div className={styles.order_span_wrap}>
            <span className={styles.order_span}>총 주문하기 </span>
            <span className={styles.btn_total_count}>
              <div>{cart.length}</div>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
