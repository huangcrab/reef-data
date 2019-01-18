import { SET_NOTIFICATION } from "../actions/types";

const initialState = {
  message: null,
  messageType: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };

    default:
      return state;
  }
}
