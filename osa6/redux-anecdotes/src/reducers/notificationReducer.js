import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showMessage(state, action) {
      return action.payload;
    },
  },
});

export const { showMessage } = notificationSlice.actions;

export const setNotification = (msg, timeout) => {
  return (dispatch) => {
    dispatch(showMessage(msg));
    setTimeout(() => {
      dispatch(showMessage(""));
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
