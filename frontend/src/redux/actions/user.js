import axios from "axios";
import { server } from "../../server.js";
// import { toast } from "react-toastify";

//!!  load user**/
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/getuser`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "LoadUserSuccess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error?.response?.data?.message,
    });
  }
};

//!!  load Seller **/
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/shop/getseller`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "LoadSellerSuccess",
      payload: data?.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFailure",
      payload: error.response.data?.message,
    });
  }
};

////!*******========Update User==========

export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data?.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data?.message,
      });
    }
  };

////!********* update User address

export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          message: data?.message,
          user: data?.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data?.message,
      });
    }
  };

////!!!---- delete address

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/user/delete-user-address/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        message: data?.message,
        user: data?.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data?.message,
    });
  }
};

///! get all users for admin dash.

export const getAdminAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAdminAllUsersRequest" });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/admin-all-users`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAdminAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAdminAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};
