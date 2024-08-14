import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // .addCase("clearError", (state) => {
    //   state.error = null;
    // })

    /// ** getAll events of shop
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      // state.success = true;
    })
    .addCase("getAllEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    /// ** getAll events for all
    .addCase("getAllEventsRequestAll", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccessAll", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
      state.success = true;
    })
    .addCase("getAllEventsFailedAll", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    //**delete event of a shop */

    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    });
});
