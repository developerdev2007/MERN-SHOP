import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsShop } from "../redux/actions/product";
import Header from "../components/Layout/Header";
import styles from "../styles/style";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Layout/Footer";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts?.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts]);

  return (
    <>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-5 mb-12 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7">
          {data &&
            data?.map((d, index) => <ProductCard data={d} key={index} />)}
        </div>
        {data && data?.length === 0 ? (
          <>
            <h1 className="w-full text-lg text-center pb-28">
              Products Not Found!!
            </h1>
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
