import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { useParams } from "react-router-dom";

const TrackOrderDetails = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, id]);

  const data = orders && orders?.find((item) => item._id === id);
  console.log(data);
  return (
    <>
      <div className="w-full h-[80vh] flex items-center justify-center  ">
        {data && data?.status === "Processing" ? (
          <h3 className="text-2xl text-center">
            Your Order is processing in the shop
          </h3>
        ) : data && data?.status === "Transferred to delivery partner" ? (
          <>
            <h3 className="text-2xl text-center">
              your is transferred to delivery partner{" "}
            </h3>
          </>
        ) : data && data?.status === "Shipping" ? (
          <>
            <h3 className="text-2xl text-center">your Order is on Shipping </h3>
          </>
        ) : data && data?.status === "Received" ? (
          <>
            <h3 className="text-2xl text-center">
              Your order is in your city,Our Deliver man will deliver it soon
            </h3>
          </>
        ) : data && data?.status === "On The Way" ? (
          <>
            <h3 className="text-2xl text-center">
              Our delivery man is going to deliver your order
            </h3>
          </>
        ) : data && data?.status === "Delivered" ? (
          <>
            <h3 className="text-2xl text-center">Your order is Delivered</h3>
          </>
        ) : data && data?.status === "Processing Refund" ? (
          <>
            <h3 className="text-2xl text-center">Processing the refund</h3>
          </>
        ) : data && data?.status === "Refund Success" ? (
          <>
            <h3 className="text-2xl text-center">
              Refund has been Success full
            </h3>
          </>
        ) : null}
      </div>
    </>
  );
};
export default TrackOrderDetails;
