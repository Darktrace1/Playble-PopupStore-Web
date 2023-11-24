import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { useEffect } from "react";
import axios from "axios";

export const Main = ({ products, setProducts, convertPrice }) => {
  // 최초 렌더링 될 때 한번만 값을 가져오게끔 함
  // 일단 지금은 "/data/products.json" 여기서 값을 가져오는데
  // 나중엔 여기를 API에서 데이터 가져오는 GET HTTP API로 해야할 듯;
  useEffect(() => {
    axios.get("/data/products.json").then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);

  console.log(products);

  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p>최신순</p>
        <p>낮은 가격</p>
        <p>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        {products.map((product) => {
          // Product의 ID Value 지정
          return (
            <Product
              key={`key-${product.id}`}
              product={product}
              convertPrice={convertPrice}
            />
          );
        })}
      </main>
    </>
  );
};
