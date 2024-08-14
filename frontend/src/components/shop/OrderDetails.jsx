import { useEffect, useState } from "react";
import styles from "../../styles/style";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch]);
  /////////////////////////////

  const handleOrderUpdate = async (e) => {
    e.preventDefault();

    toast.success(status);
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Orders has been successfully Updated");
        dispatch(getAllOrdersOfShop(seller?._id));
        navigate("/dashboard-orders");
      })
      .catch((err) => {
        toast.error(err.response.data.message, 400);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    e.preventDefault();
    toast.success(status);

    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Orders has been successfully Updated");
        dispatch(getAllOrdersOfShop(seller?._id));

        navigate("/dashboard-orders");
      })
      .catch((err) => {
        toast.error(err.response.data.message, 400);
      });
  };
  const data = orders && orders.find((item) => item._id === id);

  return (
    <>
      <div className={`${styles.section} min-h-screen py-4 `}>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center ">
            <BsFillBagFill color="crimson" size={30} />
            <h5 className="pl-2 text-2xl  ">Order Details</h5>
          </div>

          {/* //////////////////////!___________ */}

          <Link to="/dashboard-orders">
            <div
              className={`${styles.button} !bg-slate-100 font-semibold h-14 text-lg !rounded-md  text-red-700/95`}
            >
              Order List
            </div>
          </Link>
        </div>

        {/* //////////// */}
        <div className="w-full flex items-center justify-between pt-6 ">
          <h5 className="text-xl text-blue-950/95 font-medium">
            Order Id: <span className="">{data?._id.slice(0, 8)}</span>
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
              </div>
              <br />
              <div className="w-full border-t text-right">
                <h5 className="pl-3 text-lg ">
                  Total Price : <strong>US$ {data?.totalPrice}</strong>
                </h5>
              </div>
              <br />
              <br />
              <div className="w-full 800px:flex items-center  ">
                <div className="w-full 800px:w-3/5 ">
                  <h4 className="pt-3 text-xl font-medium">
                    Shipping Address :{" "}
                  </h4>
                  <h4 className="pt-3 text-xl">
                    {data?.shippingAddress?.address1 +
                      " " +
                      data?.shippingAddress?.address2}
                  </h4>

                  <h4 className="pt-3 text-xl">
                    {data?.shippingAddress?.country}
                  </h4>
                  <h4 className="pt-3 text-xl">
                    {data?.shippingAddress?.city}
                  </h4>
                  <h4 className="pt-3 text-xl">{data?.user?.phoneNumber}</h4>
                </div>{" "}
                <div className="w-full 800px:w-2/5">
                  .
                  <h5 className="pt-3 text-lg font-medium ">Payment Info : </h5>
                  <h5 className="pt-0.5 text-lg font-medium">
                    Status :
                    {data?.paymentInfo?.status
                      ? data?.paymentInfo?.status
                      : "Not Paid"}
                  </h5>
                </div>
                <br />
                <br />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex ">
                  <div className="mr-3 text-xl font-medium">
                    Order Status :{" "}
                  </div>
                  {data?.status !== "Processing Refund" &&
                    data?.status !== "Refund Success" && (
                      <>
                        {" "}
                        <select
                          className="border-2 border-teal-500/90 focus:border-teal-500/90 outline-teal-500/80 p-1 m-1  rounded-md"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {[
                            "Processing",
                            "Transferred to delivery partner",
                            "Shipping",
                            "Received",
                            "On The Way",
                            "Delivered",
                          ]
                            .slice(
                              [
                                "Processing",
                                "Transferred to delivery partner",
                                "Shipping",
                                "Received",
                                "On The Way",
                                "Delivered",
                              ].indexOf(data?.status)
                            )
                            .map((option, index) => (
                              <>
                                <option
                                  value={option}
                                  className="bg-teal-50 "
                                  key={index}
                                >
                                  {option}
                                </option>
                              </>
                            ))}
                        </select>
                      </>
                    )}
                  {data?.status === "Processing Refund" ||
                    (data?.status === "Succeed" && (
                      <>
                        <select
                          className="border-2 border-teal-500/90 focus:border-teal-500/90 outline-teal-500/80 p-1 m-1  rounded-md"
                          value={data?.status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {["Processing Refund", "Refund Success"]
                            .slice(
                              ["Processing Refund", "Refund Success"].indexOf(
                                data?.status
                              )
                            )
                            .map((option, index) => (
                              <>
                                <option
                                  value={option}
                                  className="bg-teal-50 "
                                  key={index}
                                >
                                  {option}
                                </option>
                              </>
                            ))}
                        </select>
                      </>
                    ))}
                </div>

                <button
                  className=""
                  onClick={
                    data?.status !== "Processing Refund"
                      ? handleOrderUpdate
                      : refundOrderUpdateHandler
                  }
                >
                  <div
                    className={`${styles.button} !bg-slate-100 font-semibold h-14 text-lg !rounded-md  text-red-700/95`}
                  >
                    Update Status
                  </div>
                </button>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default OrderDetails;
