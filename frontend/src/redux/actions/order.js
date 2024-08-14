import { server } from "../../server";
import axios from "axios";

/////_______________________________________________________________________
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersOfUserRequest" });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );
    // console.log(data);
    dispatch({ type: "getAllOrdersOfUserSuccess", payload: data?.orders });
  } catch (error) {
    dispatch({
      type: "getAllOrdersOfUserFailed",
      payload: error?.response?.data?.message,
    });
  }
};
/////_______________________________________________________________________
export const getAllOrdersOfShop = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllOrdersOfSellerRequest" });

    const { data } = await axios.get(
      `${server}/order/get-all-orders-seller/${sellerId}`
    );
    // console.log(data);
    dispatch({ type: "getAllOrdersOfSellerSuccess", payload: data?.orders });
  } catch (error) {
    dispatch({
      type: "getAllOrdersOfSellerFailed",
      payload: error?.response?.data?.message,
    });
  }
};

export const getAdminAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "getAdminAllOrdersRequest" });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });
    dispatch({ type: "getAdminAllOrdersSuccess", payload: data?.orders });
  } catch (error) {
    dispatch({
      type: "getAdminAllOrdersFailed",
      payload: error?.response?.data?.message,
    });
  }
};
