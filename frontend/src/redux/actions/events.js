import { toast } from "react-toastify";
import { server } from "../../server";
import axios from "axios";
///*** creating event */
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data?.event,
    });

    toast.success("Event created successfully");
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data?.message,
    });
    toast.error(error);
  }
};

////**! get all events of shop only */
export const getAllEvents = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/event/get-all-events-shop/${id}`
    );

    dispatch({ type: "getAllEventsSuccess", payload: data?.events });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data?.message,
    });
  }
};

////**! get all events for all */
export const getAllEventsAll = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequestAll" });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/event/get-all-events`
    );

    dispatch({ type: "getAllEventsSuccessAll", payload: data?.events });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailedAll",
      payload: error.response.data?.message,
    });
  }
};

////******* delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    // console.log(id);
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({
      type: "deleteEventSuccess",
      payload: data?.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data?.message,
    });
  }
};
