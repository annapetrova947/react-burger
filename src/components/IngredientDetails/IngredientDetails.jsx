import styles from "./IngredientDetails.module.css";
import { IngredientNutrition } from "./IngredientNutrition";
import { ingredientType } from "./../../utils/types";

export function IngredientDetails({ ingredient }) {
  return (
    <>
    {ingredient &&
    <div className={`${styles.details} mb-15`}>
      <img src={ingredient.image_large} alt="Ингредиент" />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.nutrition}>
        <IngredientNutrition title="Калории,ккал" value={ingredient.calories} />
        <IngredientNutrition title="Белки, г" value={ingredient.proteins} />
        <IngredientNutrition title="Жиры, г" value={ingredient.fat} />
        <IngredientNutrition
          title="Углеводы, г"
          value={ingredient.carbohydrates}
        />
      </div>
    </div>
    }
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientType,
};
