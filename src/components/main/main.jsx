import styles from "./main.module.css";
import { EventBanner } from "../eventBanner/eventBanner";
import { Product } from "../products/product";
import { useEffect } from "react";
import { getProducts } from "../../service/fetcher";

export const Main = ({ products, setProducts, convertPrice }) => {
  // 최초 렌더링 될 때 한번만 값을 가져오게끔 함
  // 일단 지금은 "/data/products.json" 여기서 값을 가져오는데
  // 나중엔 여기를 API에서 데이터 가져오는 GET HTTP API로 해야할 듯;
  useEffect(() => {
    /* axios, url이 반복되기 때문에 상수로 두고 axios 객체를 반환받아서 사용 */
    // axios.get("/data/products.json").then((data) => {
    //   setProducts(data.data.products);
    // });
    getProducts().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);

  const sortProduct = (type) => {
    const newProduct = [...products];

    if (type === "recent") {
      newProduct.sort((a, b) => a.id - b.id);
      setProducts(newProduct);
    } else if (type === "row") {
      newProduct.sort((a, b) => a.price - b.price);
      setProducts(newProduct);
    } else if (type === "high") {
      newProduct.sort((a, b) => b.price - a.price);
      setProducts(newProduct);
    }
  };

  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>최신순</p>
        <p onClick={() => sortProduct("row")}>낮은 가격</p>
        <p onClick={() => sortProduct("high")}>높은 가격</p>
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
