import { TChoosenIng } from "../../utils/types";
import { orderRequest } from "../api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

interface OrderRequestAction {
  type: typeof GET_ORDER_REQUEST;
}

interface OrderSuccessAction {
  type: typeof GET_ORDER_SUCCESS;
  order: {
    number: number;
  };
}

interface OrderFailedAction {
  type: typeof GET_ORDER_FAILED;
}

export type ItemsActionTypes = OrderRequestAction | OrderSuccessAction | OrderFailedAction;

export function makeOrder(choosenIngredients: Array<TChoosenIng>) {
  return function (dispatch: (action: ItemsActionTypes) => void) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });

    orderRequest(choosenIngredients)
      .then((res) => {
        console.log('res', res.order.number)
        if (res && res.order.number) {
          console.log('dis')
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res.order
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}