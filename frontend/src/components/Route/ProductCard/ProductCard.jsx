import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/style";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../../server";
import {
  addToWishlist,
  removeFromWishList,
} from "../../../redux/actions/wishList";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import Ratings from "../../Layout/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  console.log("productcard");
  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, []);
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
    const isItemExist = cart && cart?.find((i) => i._id === id);

    if (isItemExist) {
      toast.error("Item already exists");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Product added to cart successfully");
    }
  };

  return (
    <>
      <div className="relative w-full p-3 bg-white rounded-lg shadow-md cursor-pointer h-96 shadow-blue-600">
        <div className="flex justify-end"></div>
        <Link
          to={
            isEvent
              ? `/product/${data?._id}?isEvent=true`
              : `/product/${data?._id}`
          }
        >
          <img
            src={`${backend_url}/${data?.images && data?.images[0]}`}
            alt=""
            className="mt-5 w-9/12 mx-auto h-[40%] rounded-md object-cover"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop?._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
        </Link>
        <Link
          to={
            isEvent
              ? `/product/${data?._id}?isEvent=true`
              : `/product/${data?._id}`
          }
        >
          <h4 className="pb-3 font-medium ">
            {data?.name?.length > 40
              ? data?.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data?.originalPrice === 0
                  ? data?.originalPrice
                  : data?.discountPrice}
                ${" "}
              </h5>
              <h5 className={`${styles.price}`}>
                {data?.originalPrice ? data?.originalPrice + "$" : null}
              </h5>
            </div>
            <span className="text-base font-normal text-blue-700">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* SideOptions  */}

        <div className="">
          {click ? (
            <>
              <AiFillHeart
                size={22}
                className="absolute cursor-pointer right-2 top-5 "
                onClick={() => removeFromWishListHandler(data)}
                color={click ? "red" : "#333"}
                title="Remove from WishList"
              />
            </>
          ) : (
            <AiOutlineHeart
              size={22}
              className="absolute cursor-pointer right-2 top-5 "
              onClick={() => addToWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from WishList"
            />
          )}
          <AiOutlineEye
            size={22}
            className="absolute text-gray-800 cursor-pointer right-2 top-14 "
            onClick={() => setOpen(!open)}
            // color={!click ? "blue" : "blue"}
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={22}
            className="absolute text-gray-800 cursor-pointer right-2 top-24"
            onClick={() => addToCartHandler(data?._id)}
            // color={!click ? "blue" : "blue"}
            title="Add to cart"
          />

          {open && (
            <ProductDetailsCard open={open} setOpen={setOpen} data={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
