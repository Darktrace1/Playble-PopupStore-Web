import axios from "axios";

const url = "/data/products.json";

export const getProducts = () => {
  const res = axios(url);
  return res;
};
