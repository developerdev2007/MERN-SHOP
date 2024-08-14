import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../redux/actions/wishList";
import { backend_url } from "../../server";
import { addToCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const WishList = ({ setOpenWishList }) => {
  const { wishList } = useSelector((state) => state.wishList);
  ////-------------
  const dispatch = useDispatch();
  /////---------------------------
  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    toast.success("Product is added to cart successfully");
    setOpenWishList(false);
  };
  ////-------------------------------
  const removeFromWishListHandler = (data) => {
    dispatch(removeFromWishList(data));
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-screen bg-[#000a] ">
        <div className="fixed  top-0 right-0 h-screen 800px:w-[25%] w-10/12 bg-white flex flex-col overflow-y-auto  justify-between shadow-xl">
          {wishList && wishList.length !== 0 ? (
            <>
              {" "}
              <div className="">
                <div className="flex justify-end w-full pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer "
                    onClick={() => setOpenWishList(false)}
                  />
                </div>
                <div className={`${styles.normalFlex}  p-4 `}>
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-2 font-medium text-5">5 Items</h5>
                </div>
                <br />
                {/* single cart   */}
                <div className="w-full border-t">
                  {wishList &&
                    wishList.map((d, index) => (
                      <>
                        <CartSingle
                          key={index}
                          data={d}
                          removeFromWishListHandler={removeFromWishListHandler}
                          addToCartHandler={addToCartHandler}
                        />
                      </>
                    ))}
                </div>
              </div>
              <div className="px-5 mb-3 ">
                {/* Check out button  */}

                <Link to="/checkout">
                  <div
                    className={`${styles.normalFlex} justify-center  w-full bg-red-500 rounded-lg h-10`}
                  >
                    <h1 className="text-lg font-semibold text-white">
                      Check Out now
                    </h1>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <>
                <div className="relative flex items-center justify-center w-full h-screen">
                  <div
                    className="absolute flex justify-end w-full mt-5 mr-5 top-5 right-5 "
                    onClick={() => setOpenWishList(false)}
                  >
                    <RxCross1 size={30} className="cursor-pointer" />
                  </div>
                  <h5 className="w-full text-2xl font-semibold text-center ">
                    Wish List is Empty!!!
                  </h5>
                </div>
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
};

////// ***cart single
const CartSingle = ({ data, removeFromWishListHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);

  const totalPrice = data?.discountPrice * value;
  return (
    <>
      <div className="p-4 border-b ">
        <div className="flex items-center w-full">
          <RxCross1
            className="cursor-pointer "
            onClick={() => removeFromWishListHandler(data)}
          />
          <img
            src={`${backend_url}/${data?.images[0]}`}
            className="object-cover w-20 h-20 ml-2 rounded-md "
            alt=""
          />
          <div className="flex items-center justify-between w-full select-none">
            <div className="pl-2 select-none ">
              <h1 className="">{data?.name}</h1>
              <h4 className="pt-2 text-base font-semibold text-red-600 font-Roboto ">
                US${totalPrice}
              </h4>
            </div>
            <div className="" onClick={() => addToCartHandler(data)}>
              <BsCartPlus
                className="cursor-pointer"
                size={20}
                title="add to cart"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WishList;
