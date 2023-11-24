import { useParams } from "react-router-dom";
import styles from "./detail.module.css";

export const Detail = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.product}>
          <div className={styles.product_img}>
            <img src="/images/image002.png" alt="product" />
          </div>
        </section>
        <section className={styles.product}>
          <div className={styles.product_info}>
            <p className={styles.seller_store}>아이돈케어</p>
            <p className={styles.product_name}>마로네 노트북 파우치</p>
            <span className={styles.price}>
              1000
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
            />

            <div className={styles.count}>
              <span>1</span>
            </div>

            <img
              className={styles.plus}
              src="/images/icon-plus-line.svg"
              alt="plus"
            />
          </div>

          <div className={styles.line}></div>

          <div className={styles.sum}>
            <div>
              <span className={styles.sum_price}>총 상품 금액</span>
            </div>

            <div className={styles.total_info}>
              <span className={styles.total}>
                총 수량 <span className={styles.total_count}>1개</span>
              </span>
              <span className={styles.total_price}>
                1000
                <span className={styles.total_unit}>원</span>
              </span>
            </div>
          </div>

          <div className={styles.btn}>
            <button className={styles.btn_buy}>바로 구매</button>
            <button className={styles.btn_cart}>장바구니</button>
          </div>
        </section>
      </main>
    </>
  );
};
