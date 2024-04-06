import { v4 as uuid } from "uuid";
export const ADD_NEW_INGREDIENT = "ADD_NEW_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";

export const deleteIngredient = (ingredientId) => ({
  type: DELETE_INGREDIENT,
  payload: ingredientId,
});

export const addIngredient = (ingredient) => ({
  type: ADD_NEW_INGREDIENT,
  payload: {
    ...ingredient, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
    id: uuid(), // и добавляем в объект новое поле, которое потом будет использовано в `key`
  },
});

export const sortIngredients = (toFrom) => ({
  type: SORT_INGREDIENTS,
  payload: toFrom,
});
