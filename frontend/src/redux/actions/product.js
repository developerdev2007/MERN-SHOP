import { server } from "../../server";
import axios from "axios";

export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "productCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data?.message,
    });
  }
};

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequestShop" });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );

    dispatch({ type: "getAllProductsSuccessShop", payload: data?.products });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailedShop",
      payload: error.response.data?.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    // console.log(id);
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: "deleteProductSuccess",
      payload: data?.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data?.message,
    });
  }
};

export const getAllProductOfAll = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data?.message,
    });
  }
};


