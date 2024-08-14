import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/style";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { Rating } from "@mui/material";
import Ratings from "../Layout/Ratings";
import { getAllEvents } from "../../redux/actions/events";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllEvents(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [id, dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <>
      <div className="w-full ">
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center w-full ">
            <div
              className="flex items-center pr-5 "
              onClick={() => setActive(1)}
            >
              <h5
                className={`text-lg font-semibold ${
                  active === 1 ? "text-red-500" : "text-[#333]"
                } cursor-pointer`}
              >
                Shop Products
              </h5>
            </div>

            <div
              className="flex items-center pr-5 "
              onClick={() => setActive(2)}
            >
              <h5
                className={`text-lg font-semibold ${
                  active === 2 ? "text-red-500" : "text-[#333]"
                } cursor-pointer`}
              >
                Running Events
              </h5>
            </div>

            <div
              className="flex items-center pr-5 "
              onClick={() => setActive(3)}
            >
              <h5
                className={`text-lg font-semibold ${
                  active === 3 ? "text-red-500" : "text-[#333]"
                } cursor-pointer`}
              >
                Shop Reviews
              </h5>
            </div>
          </div>
          {isOwner && (
            <>
              <div className="">
                <Link to="/dashboard">
                  <button className={`${styles.button}  !h-10`}>
                    <span className="text-white">Go to Dashboard</span>
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="border-[1px] w-full h-[1px] border-teal-500 opacity-50 mx-auto"></div>
        {/* /// ! grid  */}

        {active === 1 && (
          <>
            <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-7">
              {products &&
                products.map((data, index) => (
                  <>
                    <ProductCard data={data} key={index} isShop={true} />
                  </>
                ))}
            </div>

            {products && products.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Products have for this shop!
              </h5>
            )}
          </>
        )}
        {active === 2 && (
          <>
            <div className="grid grid-cols-1 gap-5 mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-7">
              {events &&
                events.map((data, index) => (
                  <>
                    <ProductCard
                      data={data}
                      key={index}
                      isShop={true}
                      isEvent={true}
                    />
                  </>
                ))}
            </div>
          </>
        )}
        {/* ///////////  */}

        {active === 3 && (
          <>
            <div className="w-full">
              {allReviews &&
                allReviews.map((item) => (
                  <>
                    <div className="w-full flex my-5 items-center justify-start">
                      <img
                        src={`${backend_url}/${item?.user?.avatar}`}
                        alt=""
                        className="w-16 h-16 rounded-full object-cover "
                      />
                      <div className="pl-2 ">
                        <div className="flex w-full  items-center">
                          <h2 className="text- lg text-pink-700 font-semibold mr-2">
                            {item?.user?.name}
                          </h2>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-base">{item?.comment}</p>
                        <p className="text-xs">
                          {(item?.createdAt).slice(0, 10) || "2 days ago"}
                        </p>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ShopProfileData;
