import {
  ADD_NEW_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  TAddIngredientAction,
  TSortAction,
  TDeleteAction
} from "../actions/choosenIngredient";
import { TChoosenIng } from "../../utils/types";

interface IChoosenIngredientsState {
  ingredients: Array<TChoosenIng>
}

const initialState: IChoosenIngredientsState = {
  ingredients: [],
};


type TChoosenIngredientAction = TAddIngredientAction | TSortAction | TDeleteAction

export const choosenIngredientReducer = (state = initialState, action: TChoosenIngredientAction) => {
  switch (action.type) {
    case ADD_NEW_INGREDIENT: {
      if (action.payload.type !== "bun") {
        return {
          ingredients: [...state.ingredients, { ...action.payload }],
        };
      } else {
        return {
          ingredients: [
            ...state.ingredients.filter((ing) => ing.type !== "bun"),
            { ...action.payload },
          ],
        };
      }
    }

    case DELETE_INGREDIENT: {
      return {
        ingredients: state.ingredients.filter(
          (product) => product.id !== action.payload,
        ),
      };
    }

    case SORT_INGREDIENTS: {
      const { from, to } = action.payload;
      const sortedIngredients = [...state.ingredients];
    
      sortedIngredients.splice(to+1, 0, sortedIngredients.splice(from+1, 1)[0]);
      return {
        ingredients: [...sortedIngredients],
      };
    }
    default: {
      return state;
    }
  }
};
