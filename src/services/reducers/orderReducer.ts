import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  ItemsActionTypes
} from "../actions/order";

export interface IOrderInitialState {
  response: {
    order: {
      number: number | undefined;
    };
  };
  isRequest: boolean;
  isFailed: boolean;
}

const initialState: IOrderInitialState = {
  response: {
    order: {
      number: undefined,
    },
  },
  isRequest: false,
  isFailed: false,
};

export const orderReducer = (
  state = initialState,
  action: ItemsActionTypes
): IOrderInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isRequest: true,
        isFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        response: { order: { number: action.order.number } },
        isRequest: false,
        isFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};