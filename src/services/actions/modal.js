export const ADD_INGREDIENT_INFO_TO_MODAL = 'ADD_INGREDIENT_INFO_TO_MODAL';
export const DELETE_INGREDIENT_INFO_FROM_MODAL = 'DELETE_INGREDIENT_INFO_FROM_MODAL';

export const deleteIngredientFromModal = () => ({
    type: DELETE_INGREDIENT_INFO_FROM_MODAL
  });
  
export const addIngredientToModal = (ingredient) => ({
    type: ADD_INGREDIENT_INFO_TO_MODAL,
    payload: ingredient,
  });