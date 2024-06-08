import { v4 as uuid } from "uuid";
import { TIngredient, TChoosenIng } from "../../utils/types";
export const ADD_NEW_INGREDIENT = "ADD_NEW_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";



export type TAddIngredientAction = {
  type: typeof ADD_NEW_INGREDIENT,
  payload: TChoosenIng
}

export type TDeleteAction = {
  type: typeof DELETE_INGREDIENT,
  payload: string
}

export type TSortAction = {
  type: typeof SORT_INGREDIENTS,
  payload: {
    to: number,
    from: number
  }
}

export const deleteIngredient = (ingredientId: string) => ({
  type: DELETE_INGREDIENT,
  payload: ingredientId,
});

export const addIngredient = (ingredient: TIngredient) => ({
  type: ADD_NEW_INGREDIENT,
  payload: {
    ...ingredient,
    id: uuid(), 
  },
});


export const sortIngredients = (toFrom: {
  from: number,
  to: number
}) => ({
  type: SORT_INGREDIENTS,
  payload: toFrom,
});
