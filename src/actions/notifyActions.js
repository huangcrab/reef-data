import { SET_NOTIFICATION } from "./types";

export const setNotification = (messageType, message) => {
  return {
    type: SET_NOTIFICATION,
    message,
    messageType
  };
};
