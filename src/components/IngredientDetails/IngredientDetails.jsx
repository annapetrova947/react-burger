import "./IngredientDetails.css";
import { IngredientNutrition } from "./IngredientNutrition";
import PropTypes from "prop-types";

export function IngredientDetails({ ingredient }) {
  return (
    <div className="ingredient__details mb-15">
      <img src={ingredient.image_large} />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className="ingredient__nutrition">
        <IngredientNutrition title="Калории,ккал" value={ingredient.calories} />
        <IngredientNutrition title="Белки, г" value={ingredient.proteins} />
        <IngredientNutrition title="Жиры, г" value={ingredient.fat} />
        <IngredientNutrition
          title="Углеводы, г"
          value={ingredient.carbohydrates}
        />
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
