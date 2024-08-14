import { useEffect, useState } from "react";
import styles from "../../styles/style";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const [productData, setProductData] = useState();
  const { allProducts } = useSelector((state) => state.product);

  // console.log(data);
  useEffect(() => {
    const d =
      allProducts && allProducts?.filter((i) => i.category === data.category);

    setProductData(d);
  }, []);

  return (
    <>
      {data && (
        <div className={`${styles.section} p-4 `}>
          <h2
            className={`${styles.heading} text-xl font-medium border-b-2 mb-5 `}
          >
            Related Products
          </h2>
          <div
            className={`grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6  xl:grid-cols-5 xl:gap-7 mb-12 border-0`}
          >
            {productData &&
              productData?.map((d, index) => (
                <>
                  <ProductCard key={index} data={d} />{" "}
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestedProducts;
