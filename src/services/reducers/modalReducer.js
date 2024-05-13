import {
  ADD_INGREDIENT_INFO_TO_MODAL,
  DELETE_INGREDIENT_INFO_FROM_MODAL,
} from "./../actions/modal";

const initialState = {
  currentIngredient: undefined,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_INFO_TO_MODAL: {
      return {
        currentIngredient: action.payload,
      };
    }
    case DELETE_INGREDIENT_INFO_FROM_MODAL: {
      return { currentIngredient: undefined };
    }
    default: {
      return state;
    }
  }
};
