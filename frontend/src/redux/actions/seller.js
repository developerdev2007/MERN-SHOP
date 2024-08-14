import axios from "axios";
import { server } from "../../server";

export const getAdminAllSellers = () => async (dispatch) => {
  try {
    dispatch({ type: "adminAllSellersRequest" });

    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllSellersSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "adminAllSellersFailure",
      payload: error.response.data.message,
    });
  }
};
