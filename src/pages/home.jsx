import { Main } from "../components/main/main";

// home에서 상품 변수 및 가격 변환 함수들 받아서 Main으로 넘겨주기
const Home = ({ products, setProducts, convertPrice }) => {
  return (
    <Main
      products={products}
      setProducts={setProducts}
      convertPrice={convertPrice}
    />
  );
};

export default Home;
