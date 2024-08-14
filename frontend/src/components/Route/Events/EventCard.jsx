import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/style";
import CountDown from "./CountDown";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExist = cart && cart?.find((i) => i?._id === data?._id);

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
      {data && (
        <div
          className={`block w-full p-2  bg-white rounded-lg lg:flex ${
            active ? "unset" : "mb-12"
          }`}
        >
          <div className="w-full lg:w-[50%] m-auto ">
            <img
              src={`${backend_url}/${data?.images[0]}`}
              alt=""
              className="object-cover w-11/12 h-full"
            />
          </div>
          <div className="w-full lg:w-[50%] flex  flex-col justify-center ">
            <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
            <p className="">{data?.description}</p>
            <div className="flex justify-between py-2">
              <div className="flex">
                <h5 className="text-lg font-normal text-[#d55b45] pr-3  line-through ">
                  {data?.originalPrice}
                </h5>
                <h5 className="text-xl font-bold  text-[#333] font-Roboto  ">
                  {data?.discountPrice}
                </h5>
              </div>
              <span className="pr-3 text-lg font-normal text-blue-500 ">
                {data?.sold_out}
              </span>
            </div>

            <div className="">
              <CountDown data={data} />
            </div>
            <br />
            <div className="flex items-center justify-around">
              <Link to={`/product/${data?._id}?isEvent=true`}>
                <div className={`${styles.button} text-white/90 text-lg`}>
                  <button className="text-white">See details</button>
                </div>
              </Link>

              <div
                className={`${styles.button} text-white/95 text-base`}
                onClick={(e) => addToCartHandler(data)}
              >
                <button className="text-white">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
