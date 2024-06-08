import { getIngreduents } from "../api";
import { TIngredient } from "../../utils/types";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

interface GetItemsRequestAction {
  type: typeof GET_ITEMS_REQUEST;
}

interface GetItemsSuccessAction {
  type: typeof GET_ITEMS_SUCCESS;
  items: TIngredient[]; 
}

interface GetItemsFailedAction {
  type: typeof GET_ITEMS_FAILED;
}

type ItemsActionTypes = GetItemsRequestAction | GetItemsSuccessAction | GetItemsFailedAction;

export function getItems() {
  return function (dispatch: (action: ItemsActionTypes) => void) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getIngreduents()
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
