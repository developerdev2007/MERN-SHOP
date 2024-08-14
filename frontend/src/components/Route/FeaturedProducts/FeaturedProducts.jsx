import { useSelector } from "react-redux";
import { productData } from "../../../static/data";
import styles from "../../../styles/style";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.product);
  console.log("featuredPrduts");
  return (
    <>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1 className="">Featured Products</h1>
        </div>
        <div
          className={`grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6  xl:grid-cols-5 xl:gap-7 mb-12 border-0`}
        >
          {allProducts &&
            allProducts.map((data) => (
              <ProductCard data={data} key={data?._id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
