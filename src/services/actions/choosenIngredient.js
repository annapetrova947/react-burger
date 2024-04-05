
export const ADD_NEW_INGREDIENT = 'ADD_NEW_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const deleteIngredient = (ingredientId) => ({
    type: DELETE_INGREDIENT,
    payload: ingredientId
  });
  
export const addIngredient = (ingredientId) => ({
    type: ADD_NEW_INGREDIENT,
    payload: ingredientId,
  });

export const sortIngredients = (toFrom) => (
  {
    type: SORT_INGREDIENTS,
    payload: toFrom
  }
)

