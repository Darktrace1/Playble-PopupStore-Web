import styles from "./cart.module.css";

export const CartHeader = ({ handleAllCheck, isAllChecked }) => {
  return (
    <div className={styles.cart_title_wrap}>
      <div className={styles.tab_title}>
        <input
          type="checkbox"
          onChange={(e) => {
            handleAllCheck(e.currentTarget.checked);
          }}
          checked={isAllChecked}
        />
        <span>상품정보</span>
        <span>수량</span>
        <span>상품금액</span>

        <p>전체선택</p>
      </div>
    </div>
  );
};
