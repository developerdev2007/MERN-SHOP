import { useEffect, useMemo, useState } from "react";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/products/ProductDetails";
import Footer from "../components/Layout/Footer";
import { useParams, useSearchParams } from "react-router-dom";
import SuggestedProducts from "../components/products/SuggestedProducts";
import { useDispatch, useSelector } from "react-redux";
// import { getAllProductOfAll } from "../redux/actions/product";

const ProductsDetailsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.events);

  const [data, setData] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const eventData = searchParams.get("isEvent");
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const checkConditions = () => {
  //     if (eventData) {
  //       const data = allEvents && allEvents?.find((i) => i._id === id);
  //       setData(data);
  //     } else {
  //       const data = allProducts && allProducts?.find((i) => i._id === id);
  //       setData(data);
  //     }
  //   };

  //   checkConditions();
  //   console.log("first");
  // }, []);

  const checkConditions = useMemo(() => {
    return () => {
      if (eventData) {
        const data = allEvents && allEvents?.find((i) => i._id === id);
        setData(data);
      } else {
        const data = allProducts && allProducts?.find((i) => i._id === id);
        setData(data);
      }
    };
  }, [id, eventData]);

  // dispatch(getAllProductOfAll());
  useEffect(() => {
    checkConditions();
    console.log("first");
  }, [checkConditions]);

  console.log("ProductsDetailsPage");

  return (
    <>
      <>
        <Header />
        <ProductDetails data={data} />
        {!eventData && data && <SuggestedProducts data={data} />}
        <Footer />
      </>
    </>
  );
};

export default ProductsDetailsPage;
