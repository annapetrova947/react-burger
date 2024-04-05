import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux'

export function Ingredient(props) {
  const ingredient = props.ingredient
  const [, dragRef] = useDrag({
    type: 'ing',
    item: {ingredient}
});

const choosenIngredients = useSelector(store => store.choosenIngredients.ingredients);
const ingredientInChoosen = choosenIngredients.filter(ing => ing._id === props.ingredient._id)

const ingredientAmount = ingredientInChoosen.length !== 0 ? ingredientInChoosen.length : undefined

  return (
    <div ref={dragRef} className={styles.ingredient} onClick={props.onClickFunction}>
      <img src={props.ingredient.image} alt="Ингредиент" />
      {ingredientAmount ?  <Counter count={ingredientAmount} size="default" extraClass="m-1" /> : ''}
     
      <div className={styles.priceblock}>
        <p className={`${styles.price} text text_type_digits-default mr-1`}>
          {props.ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name} mt-1 text text_type_main-default`}>
        {props.ingredient.name}
      </p>
    </div>
  );
}

Ingredient.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  ingredient: ingredientType.isRequired,
};
