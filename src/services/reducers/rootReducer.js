import { combineReducers } from "redux";
import { ingredientsReducer}  from './ingreduentsReducer'
import {modalReducer} from './modalReducer'
import { orderReducer } from './orderReducer'
import { choosenIngredientReducer } from './choosenIngredientsReducer'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    choosenIngredients: choosenIngredientReducer
  });