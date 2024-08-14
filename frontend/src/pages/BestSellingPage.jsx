import { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    //  const d = allProducts && allProducts.sort((a,b) => b.sold_out - a.sold_out); we will add it after complete order route
    const d = allProducts;
    setData(d);
  }, [allProducts]);

  return (
    <>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 mb-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7">
          {data &&
            data?.map((d, index) => <ProductCard data={d} key={index} />)}
        </div>
      </div>
    </>
  );
};

export default BestSellingPage;
