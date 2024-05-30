import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingreduentsReducer";
import { modalReducer } from "./modalReducer";
import { orderReducer } from "./orderReducer";
import { choosenIngredientReducer } from "./choosenIngredientsReducer";
import { authReducer } from "./authReducer";
import { passwordReducer } from "./passwordReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer,
  choosenIngredients: choosenIngredientReducer,
  auth: authReducer,
  passwordReset: passwordReducer,
  user: userReducer,
});
