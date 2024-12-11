import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import {
  addToWishlist,
  removeFromWishList,
} from "../../redux/actions/wishList";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../Layout/Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (wishList && wishList.find((i) => i?._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);
  //////////---------------------------------------------------------
  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };
  ///////////-------------------------=============================
  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  /////////////----------------------------
  const addToCartHandler = (id) => {
    const isItemExist = cart && cart?.find((i) => i?._id === id);

    if (isItemExist) {
      toast.error("Item already exists");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Product added to cart successfully");
    }
  };

  useEffect(() => {
    dispatch(getAllProductsShop(data?.shop?._id));
  }, [data?.shop?._id]);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const totalReviewsLength = data && data?.reviews?.length;
  const totalReviews =
    products && products.reduce((acc, item) => acc + item.reviews?.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, item) =>
        acc + item.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const averageRatings = totalRatings / totalReviews || 0;

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const groupTitle = data._id + user?._id;
      const userId = user?._id;
      const sellerId = data.shop?._id;
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Please Login to send message");
    }
  };
  return (
    <>
      <div className="bg-gray-100 ">
        {data ? (
          <>
            <div className={`${styles.section} w-11/12 800px:w-10/12 `}>
              <div className="w-full py-5">
                <div className="block w-full 800px:flex ">
                  <div className="block w-full 800px:w-1/2">
                    <img
                      src={`${backend_url}/${
                        data?.images && data?.images[select]
                      }`}
                      alt=""
                      className="w-10/12 mb-4 shadow-sm shadow-blue-400"
                    />
                    <div className="flex-wrap w-full 800px:flex">
                      <div className="flex w-full ">
                        {data &&
                          data?.images.map((i, index) => (
                            <>
                              <div
                                className={`${
                                  select === index
                                    ? "border-2 p-2 rounded-lg border-gray-500"
                                    : "null"
                                } cursor-pointer px-2`}
                              >
                                <img
                                  src={`${backend_url}/${i}`}
                                  alt=""
                                  className="object-contain h-48 rounded-lg shadow-md shadow-blue-700"
                                  onClick={() => setSelect(index)}
                                />
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full 800px:w-1/2 ">
                    <h1 className={`${styles.productTitle} pt-5`}>
                      {data?.name}
                    </h1>
                    <p className={`text-base`}>{data?.description}</p>
                    <div className="flex pt-4">
                      <h4 className={`${styles.productDiscountPrice}`}>
                        {data?.discountPrice}$
                      </h4>
                      <h3 className={`${styles.price}`}>
                        {data?.originalPrice ? data?.originalPrice + "$" : null}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between pr-3 mt-12">
                      <div className="flex justify-start">
                        <div className="">
                          <button
                            className="px-4 py-2 text-base font-medium text-white transition duration-300 ease-in-out rounded-l shadow-md i bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-70"
                            onClick={decrementCount}
                          >
                            -
                          </button>
                        </div>
                        <span className="px-4 py-2 font-medium text-gray-700 bg-gray-200 ">
                          {count}
                        </span>
                        <div className="">
                          <button
                            className="px-4 py-2 text-base font-medium text-white transition duration-300 ease-in-out rounded-r shadow-md i bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-70"
                            onClick={incrementCount}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex">
                        {click ? (
                          <>
                            <AiFillHeart
                              size={30}
                              className="cursor-pointer"
                              onClick={() => removeFromWishListHandler(data)}
                              color={click ? "red" : "#333"}
                              title="Remove from WishList"
                            />
                          </>
                        ) : (
                          <AiOutlineHeart
                            size={30}
                            className="cursor-pointer"
                            onClick={() => addToWishListHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Remove from WishList"
                          />
                        )}
                      </div>
                    </div>
                    <div
                      className={`${styles.button} mt-6 rounded-lg  h-11  flex items-center`}
                      onClick={() => addToCartHandler(data?._id)}
                    >
                      {" "}
                      <span className="flex items-center text-white">
                        Add to Cart
                        <AiOutlineShoppingCart className="ml-1 " />
                      </span>
                    </div>
                    <div className="flex items-center pt-8">
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <img
                          src={`${backend_url}/${data?.shop?.avatar}`}
                          alt=""
                          className="object-cover w-12 h-12 mr-2 rounded-full"
                        />

                        <div className="pl-2">
                          <h3 className={`${styles.shop_name}   `}>
                            {data?.shop.name}
                          </h3>
                          <h5 className="pb-3 text-base">
                            ({data?.shop.rating}) Ratings
                          </h5>
                        </div>
                      </Link>
                      {/* <Link to="/inbox"> */}
                      <div
                        className={`${styles.button} bg-violet-600 mt-4 rounded-lg ml-4 h-11`}
                        onClick={handleMessageSubmit}
                      >
                        <span className="flex items-center text-lg text-white">
                          Send Message <AiOutlineMessage className="ml-1" />
                        </span>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
                <ProductDetailsInfo
                  data={data}
                  totalReviewsLength={totalReviewsLength}
                  averageRatings={averageRatings}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

////////////////---------------------------------------------

const ProductDetailsInfo = ({ data, totalReviewsLength, averageRatings }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);

  return (
    <>
      <div className="h-full px-3 rounded-sm bg-slate-300 800px:py-2">
        <div className="flex justify-around w-full pt-10 pb-2 border-b-2 ">
          <div className="relative">
            <h3
              className="px-1 text-lg font-semibold leading-5 cursor-pointer 800px:text-xl"
              onClick={() => setActive(1)}
            >
              Products Details{" "}
            </h3>
            {active === 1 ? (
              <>
                <div className={`${styles.active_indicator}`}></div>
              </>
            ) : null}
          </div>

          <div className="relative">
            <h3
              className="px-1 text-lg font-semibold leading-5 cursor-pointer 800px:text-xl"
              onClick={() => setActive(2)}
            >
              Products Reviews{" "}
            </h3>
            {active === 2 ? (
              <>
                <div className={`${styles.active_indicator}`}></div>
              </>
            ) : null}
          </div>

          <div className="relative">
            <h3
              className="px-1 text-lg font-semibold leading-5 cursor-pointer 800px:text-xl"
              onClick={() => setActive(3)}
            >
              Seller information{" "}
            </h3>
            {active === 3 ? (
              <>
                <div className={`${styles.active_indicator}`}></div>
              </>
            ) : null}
          </div>
        </div>
        {active === 1 ? (
          <>
            <p className="py-2 pb-10 text-lg leading-8 whitespace-pre-line">
              {data?.description}
            </p>
          </>
        ) : active === 2 ? (
          <>
            <div className="flex flex-col items-center p-4 overflow-y-auto w-full min-h-40 ">
              {data &&
                data?.reviews?.map((item, index) => (
                  <>
                    <div className="w-full flex my-2 ">
                      <img
                        src={`${backend_url}/${item?.user?.avatar}`}
                        alt=""
                        className="ml-2 w-20 h-20 object-cover rounded-full"
                      />
                      <div className="pl-2">
                        <div className="w-full flex items-center">
                          <h1 className="font-medium  mr-2">
                            {item?.user?.name}
                          </h1>
                          <Ratings rating={item?.rating} />
                        </div>
                        <p className="">{item?.comment}</p>
                      </div>
                    </div>
                  </>
                ))}
              <div className="w-full justify-center flex">
                {data && data?.reviews?.length === 0 && (
                  <>
                    <h5 className="text-2xl text-center">No Reviews yet</h5>
                  </>
                )}
              </div>
            </div>
          </>
        ) : active === 3 ? (
          <>
            <div className="block w-full p-5 800px:flex ">
              <div className="w-full 800px:w-1/2">
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <div className="flex items-center">
                    <img
                      src={`${backend_url}/${data?.shop?.avatar}`}
                      alt=""
                      className="object-cover w-12 h-12 rounded-full"
                    />
                    <div className="pl-3">
                      <h3 className={`${styles.shop_name}   `}>
                        {data?.shop.name}
                      </h3>
                      <h5 className="pb-2 text-base">
                        {averageRatings}/5 Ratings
                      </h5>
                    </div>
                  </div>
                </Link>
                <p className="pt-2 ">{data?.shop?.description}</p>
              </div>
              <div className="flex-col items-end w-full mt-5 800px:w-1/2 800px:flex 800px:mt-0">
                <div className="text-left">
                  <h5 className="font-semibold">
                    Joined on{" "}
                    <span className="font-semibold">
                      {data?.shop?.createdAt.slice(0, 10)}{" "}
                    </span>
                  </h5>

                  <h5 className="font-semibold">
                    Total Products{" "}
                    <span className="font-semibold">
                      {products && products?.length}
                    </span>
                  </h5>

                  <h5 className="font-semibold">
                    Total Reviews :
                    <span className="font-semibold">{totalReviewsLength}</span>
                  </h5>
                </div>
                <Link to="/">
                  <div className={`${styles.button}rounded-lg  h-10 mt-14`}>
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};
export default ProductDetails;
