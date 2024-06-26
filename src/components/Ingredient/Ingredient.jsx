import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Ingredient(props) {
  const ingredient = props.ingredient;
  const [, dragRef] = useDrag({
    type: "ing",
    item: { ingredient },
  });

  const choosenIngredients = useSelector(
    (store) => store.choosenIngredients.ingredients,
  );
  const ingredientInChoosen = choosenIngredients.filter(
    (ing) => ing._id === props.ingredient._id,
  );

  const ingredientAmount =
    ingredientInChoosen.length !== 0 ? ingredientInChoosen.length : undefined;

  const location = useLocation();

  return (
    <div ref={dragRef} className={styles.ingredient}>
      <Link
        key={ingredient._id}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <img src={props.ingredient.image} alt="Ингредиент" />
        {ingredientAmount ? (
          <Counter count={ingredientAmount} size="default" extraClass="m-1" />
        ) : (
          ""
        )}

        <div className={styles.priceblock}>
          <p className={`${styles.price} text text_type_digits-default mr-1`}>
            {props.ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={`${styles.name} mt-1 text text_type_main-default`}>
          {props.ingredient.name}
        </p>
      </Link>
    </div>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};
