import { useEffect, useState } from "react";
import styles from "../../styles/style";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, id]);

  const refundHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/order/give-a-refund/${id}`,
        {
          status: "Processing Refund",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user?._id));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const reviewHandler = async (e) => {
    e.preventDefault();

    console.log(selectedItem);
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/product/create-new-review`,
        {
          user,
          rating,
          productId: selectedItem?._id,
          comment,
          orderId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setComment("");
        setOpen(false);
        setRating(0);
        setSelectedItem(null);
        dispatch(getAllOrdersOfUser(user?._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setComment("");
        setOpen(false);
        setRating(0);
        setSelectedItem(null);
        dispatch(getAllOrdersOfUser(user?._id));
      });
  };
  const data = orders && orders.find((item) => item._id === id);

  return (
    <>
      <div className={`${styles.section} min-h-screen py-4 select-none `}>
        <div className="w-full flex items-center mt-2 justify-center">
          <div className="flex items-center ">
            <BsFillBagFill color="crimson" size={40} />
            <h5 className="pl-2 text-3xl  font-semibold ">Order Details</h5>
          </div>
        </div>
        {/* //////////// */}
        <div className="w-full flex items-center justify-between pt-6 ">
          <h5 className="text-xl text-blue-950/95 font-medium">
            {/* Order Id: <span className="">{data?._id.slice(0, 8)}</span> */}
            Order Id: <span className="">{data?._id}</span>
          </h5>
          <h5 className="text-xl text-blue-950/95 font-medium">
            Placed on: <span className="">{data?.createdAt.slice(0, 10)}</span>
          </h5>
        </div>
        <br />
        <br />
        {/* ///data items  */}
        {data?.cart &&
          data?.cart?.map((item) => (
            <>
              <div className="w-full flex items-start mb-5 ">
                <img
                  src={`${backend_url}/${item?.images[0]}`}
                  alt=""
                  className="w-20 h-16 object-cover"
                />

                <div className="w-full">
                  <h5 className="pl-3 text-xl text-blue-950/95 font-medium ">
                    {item?.name}
                  </h5>
                  <h5 className="pl-3 text-xl text-blue-950/90 font-normal ">
                    US$ {item?.discountPrice} x {item?.qty}
                  </h5>
                </div>
                {data?.status === "Delivered" && (
                  <>
                    {!item?.isReviewed &&
                    data?.status === "Delivered" ? null : (
                      <>
                        <div
                          className={`${styles.button} text-white/95`}
                          onClick={() => setOpen(true) || setSelectedItem(item)}
                        >
                          Write a review{" "}
                        </div>
                      </>
                    )}
                  </>
                )}

                {open && (
                  <>
                    <div className="w-full fixed top-0 left-0 right-0 bg-black/40 z-50 h-screen flex items-center justify-center ">
                      <div className="w-11/12 800px:w-1/2 h-[80vh] bg-white/95  shadow-lg p-3 overflow-x-auto overflow-y-auto shadow-teal-500/90  ">
                        <div
                          className="w-full flex justify-end p-3"
                          onClick={() => setOpen(false)}
                        >
                          <RxCross1 size={30} className="cursor-pointer" />
                        </div>
                        <h2 className="w-11/12 font-medium text-2xl font-Poppins uppercase select-none text-center">
                          Give a Review{" "}
                        </h2>
                        <br />
                        <div className="w-full flex ">
                          <img
                            src={`${backend_url}/${selectedItem?.images[0]}`}
                            alt=""
                            className="w-20 h-20 object-cover p-2 border border-teat-500"
                          />

                          <div className="">
                            <div className="pl-3 text-lg ">
                              {selectedItem?.name}
                            </div>

                            <h5 className="text-lg pl-3">
                              US$ {selectedItem?.discountPrice} X{" "}
                              {selectedItem?.qty}
                            </h5>
                          </div>
                        </div>
                        <br />
                        <br />

                        {/* rating  */}
                        <h5 className="text-xl font-medium ">
                          Give a Rating{" "}
                          <span className="text-red-600 text-lg">*</span>
                        </h5>
                        <div className="w-full flex ml-2 p-1">
                          {[1, 2, 3, 4, 5].map((i) =>
                            rating >= i ? (
                              <>
                                <AiFillStar
                                  size={30}
                                  key={i}
                                  className="mr-1 cursor-pointer text-yellow-500 "
                                  onClick={() => setRating(i)}
                                />
                              </>
                            ) : (
                              <AiOutlineStar
                                size={30}
                                key={i}
                                className="mr-1 cursor-pointer text-yellow-500 "
                                onClick={() => setRating(i)}
                              />
                            )
                          )}
                        </div>
                        <br />
                        <div className="w-full ml-3 ">
                          <label
                            htmlFor="comment"
                            className="block text-lg font-medium"
                          >
                            Write a comment{" "}
                            <span className="font-Poppins text-base text-black/90">
                              (optional)
                            </span>
                          </label>

                          <textarea
                            name="comment"
                            id="comment"
                            cols="10"
                            rows="4"
                            placeholder="How was your product , Write a comment here "
                            className="mt-2 w-11/12 border border-teal-500/90 outline-none p-2 "
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>

                        <div
                          className={`${styles.button} !text-white text-xl ml-3 `}
                          onClick={rating > 1 ? reviewHandler : null}
                          disabled={rating < 1 ? true : false}
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <br />
              <div className="w-full border-t text-right">
                <h5 className="pl-3 text-lg ">
                  Total Price : <strong>US$ {data?.totalPrice}</strong>
                </h5>
              </div>
            </>
          ))}
        <br />
        <div className="flex justify-between items-center">
          <div className="w-full 800px:w-3/5 ">
            <h4 className="pt-3 text-xl font-medium">Shipping Address : </h4>
            <h4 className="pt-3 text-xl">
              {data?.shippingAddress?.address1 +
                " " +
                data?.shippingAddress?.address2}
            </h4>

            <h4 className="pt-3 text-xl">{data?.shippingAddress?.country}</h4>
            <h4 className="pt-3 text-xl">{data?.shippingAddress?.city}</h4>
            <h4 className="pt-3 text-xl">{data?.user?.phoneNumber}</h4>
          </div>
          <div className="w-full 800px:w-2/5">
            <h5 className="pt-3 text-lg font-medium ">Payment Info : </h5>
            <h5 className="pt-0.5 text-lg font-medium">
              Status :
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h5>
            <br />
            {data?.status === "Delivered" && (
              <div
                className={`${styles.button} text-white `}
                onClick={refundHandler}
              >
                Give a Refund!!
              </div>
            )}
          </div>
          <Link to="/">
            <div className={`${styles.button} text-white `}>Send Message</div>
          </Link>
        </div>{" "}
      </div>
    </>
  );
};

export default UserOrderDetails;
