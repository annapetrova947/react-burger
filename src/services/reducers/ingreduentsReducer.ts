import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions/ingredients";
import { TIngredient } from "../../utils/types";


export interface IngredientsState {
  items: TIngredient[]; 
  itemsRequest: boolean;
  itemsFailed: boolean;
}


const initialState: IngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

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

type IngredientsActionTypes = GetItemsRequestAction | GetItemsSuccessAction | GetItemsFailedAction;

export const ingredientsReducer = (
  state = initialState,
  action: IngredientsActionTypes
): IngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
