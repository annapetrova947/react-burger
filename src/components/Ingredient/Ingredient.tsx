import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Ingredient.module.css";
import { TIngredient } from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from "./../../services/store";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type TIngredientInfo = {
  ingredient: TIngredient
}

export function Ingredient({ingredient}: TIngredientInfo) {

  const [, dragRef] = useDrag({
    type: "ing",
    item: { ingredient },
  });

  const choosenIngredients = useSelector(
    (store) => store.choosenIngredients.ingredients,
  );
  const ingredientInChoosen = choosenIngredients.filter(
    (ing: TIngredient) => ing._id === ingredient._id,
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
        <img src={ingredient.image} alt="Ингредиент" />
        {ingredientAmount ? (
          <Counter count={ingredientAmount} size="default" extraClass="m-1" />
        ) : (
          ""
        )}

        <div className={styles.priceblock}>
          <p className={`${styles.price} text text_type_digits-default mr-1`}>
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>

        <p className={`${styles.name} mt-1 text text_type_main-default`}>
          {ingredient.name}
        </p>
      </Link>
    </div>
  );
}

