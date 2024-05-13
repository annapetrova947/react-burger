import { orderRequest } from "./../api.js";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function makeOrder(choosenIngredients) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderRequest(choosenIngredients)
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res,
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch((e) => console.log(e));
  };
}
