import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/style";
import { backend_url } from "../../../server";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishList,
} from "../../../redux/actions/wishList";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  console.log("productdetailsof caard");
  const handleMessageSubmit = () => {};

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList, data?._id]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart?.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Item already exists");
    } else {
      if (data?.stock < count) {
        toast.error("Products stock limited!  ");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Product added to cart successfully");
      }
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (count > 0) {
      setCount(count + 1);
    }
  };
  return (
    <>
      <div className="bg-[#fff]">
        {data ? (
          <>
            <div className="fixed w-full h-screen top-0 left-0 bg-[#000000bb] z-40 flex items-center justify-center ">
              <div className="w-[90%] 800px:w-[60%] 800px:h-[75vh] h-[90vh] bg-white rounded-md shadow-md p-4 relative  overflow-y-auto">
                <RxCross1
                  size={30}
                  className="absolute z-50 right-3 top-3"
                  onClick={() => setOpen(false)}
                />
                <div className="block w-full 800px:flex">
                  <div className="w-full 800px:w-[50%]">
                    <img
                      src={`${backend_url}/${data?.images[0]}`}
                      alt=""
                      className=""
                    />

                    <Link
                      to={`/shop/preview/${data?.shop._id}`}
                      className="flex"
                    >
                      <img
                        src={`${backend_url}/${data?.shop?.avatar}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full mr-2 object-cover "
                      />
                      <div className="">
                        <h3 className={`${styles.shop_name}`}>
                          {data?.shop.name}
                        </h3>
                        <h5 className="pb-3 text-base">(4.5) Ratings</h5>
                      </div>
                    </Link>
                    <div
                      className={`${styles.button} bg-[#000] mt-4 rounded-lg h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="flex items-center justify-center text-white">
                        Send Message <AiOutlineMessage className="ml-1 " />
                      </span>
                    </div>
                    <h3 className="mt-5 text-base text-red-600 ">
                      ({data?.sold_out})sold Out
                    </h3>
                  </div>

                  <div className="w-full pt-5 pl-1 pr-1 800px:w-[50%]">
                    <h1 className={`${styles.productTitle} text-lg`}>
                      {data?.name}
                    </h1>
                    <p className="">{data?.description}</p>

                    <div className="flex pt-3">
                      <h4 className={`${styles.productDiscountPrice}`}>
                        {data?.discountPrice + "$"}
                      </h4>
                      <h3 className={`${styles.price}`}>
                        {data?.originalPrice ? data?.originalPrice + "$" : ""}
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
                    <div className="flex">
                      <button
                        className={`${styles.button} flex items-center  mt-6 rounded h-11 text-white`}
                        onClick={() => addToCartHandler(data?._id)}
                      >
                        <span className="flex items-center text-white ">
                          Add to Cart
                          <AiOutlineShoppingCart className="ml-1" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ProductDetailsCard;
