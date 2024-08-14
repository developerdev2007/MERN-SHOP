import { RxCross1, RxCross2 } from "react-icons/rx";
import styles from "../../styles/style";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const removeFromCartHandler = async (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-screen bg-[#000a] ">
        <div className="fixed  top-0 right-0 overflow-y-auto h-full 800px:w-[25%]  w-10/12 bg-white flex flex-col   justify-between shadow-xl">
          {cart && cart.length !== 0 ? (
            <>
              <div className="w-full">
                <div className="flex justify-end w-full pt-5 pr-5">
                  <RxCross1
                    size={25}
                    className="cursor-pointer "
                    onClick={() => setOpenCart(false)}
                  />
                </div>
                <div className={`${styles.normalFlex}  p-4 `}>
                  <IoBagHandleOutline size={25} />
                  <h5 className="pl-2 font-medium text-5">
                    {cart && cart.length} Items
                  </h5>
                </div>
                <br />
                {/* single cart   */}
                <div className="w-full border-t">
                  {cart &&
                    cart.map((d, index) => (
                      <>
                        <CartSingle
                          key={index}
                          data={d}
                          quantityChangeHandler={quantityChangeHandler}
                          removeFromCartHandler={removeFromCartHandler}
                        />
                      </>
                    ))}
                </div>
              </div>
              <div className="px-5 mb-3 mt-5">
                {/* Check out button  */}

                <Link to="/checkout">
                  <div
                    className={`${styles.normalFlex} justify-center  w-full bg-red-500 rounded-lg h-10`}
                  >
                    <h1 className="text-lg font-semibold text-white">
                      Check Out now (USD${totalPrice})
                    </h1>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex items-center justify-center w-full h-screen">
                <div
                  className="absolute flex justify-end w-full mt-5 mr-5 top-5 right-5 "
                  onClick={() => setOpenCart(false)}
                >
                  <RxCross1 size={30} className="cursor-pointer" />
                </div>
                <h5 className="w-full text-2xl font-semibold text-center ">
                  Cart is Empty!!!
                </h5>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

////// ***cart single
const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data?.qty);

  const increment = (data) => {
    if (data?.stock < value) {
      toast.error("Product stock is limited");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };
  const totalPrice = data?.discountPrice * value;
  return (
    <>
      <div className="p-4 border-b ">
        <div className="flex items-center w-full ">
          <div className="w-12 space-y-3">
            <div
              className="bg-[#e44343] border flex items-center justify-center cursor-pointer border-purple-600 rounded-full w-6 h-6"
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="white" />
            </div>
            <span className="pl-2.5 select-none">{data?.qty}</span>
            <div
              className="bg-[#a7abb14f] rounded-full w-6 h-6 flex items-center justify-center cursor-pointer "
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={18} className="p-0 text-xl text-gray-700" />
            </div>
          </div>
          <div className="flex items-center justify-around w-full ml-2">
            <div className="ml-2 select-none ">
              <img
                src={`${backend_url}/${data?.images[0]}`}
                className="object-cover w-20 h-16 rounded-sm"
                alt=""
              />
            </div>

            <div className="select-none ">
              <h1 className="w-full">{data?.name}</h1>
              <h4 className="w-full text-base font-normal text-gray-400">
                ${data?.discountPrice} * {value}
              </h4>
              <h4 className="w-full pt-2 text-base font-semibold text-red-600 font-Roboto ">
                US${totalPrice}
              </h4>
            </div>
            <RxCross2
              size={25}
              className="cursor-pointer"
              onClick={() => removeFromCartHandler(data)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
