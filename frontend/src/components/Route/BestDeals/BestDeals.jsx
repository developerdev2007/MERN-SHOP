import { useEffect, useState } from "react";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const allProductsData = allProducts && [...allProducts];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData?.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  console.log("BestDeals");
  return (
    <>
      <div className={`${styles.section} `}>
        <div className={`${styles.heading}`}>
          <h1 className=""> Best Deals</h1>
        </div>
        <div
          className={`grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6  xl:grid-cols-5 xl:gap-7 mb-12 border-0`}
        >
          {data &&
            data?.map((d, index) => <ProductCard key={index} data={d} />)}
        </div>
        {!!data && (
          <h3 className="w-full flex justify-center items-center  text-3xl text-red-500 font-medium mb-10">
            No Products For Best Deal Currently Available
          </h3>
        )}
      </div>
    </>
  );
};

export default BestDeals;
