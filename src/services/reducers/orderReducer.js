import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "./../actions/order";

const initialState = {
  response: {},
  isRequest: false,
  isFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        isFailed: false,
        response: action.order,
        isRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, isFailed: true, isRequest: false };
    }
    default: {
      return state;
    }
  }
};
