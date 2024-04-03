import PropTypes from "prop-types";

export function IngredientNutrition(props) {
  return (
    <div>
      <p className="text text_type_main-default text_color_inactive">
        {props.title}
      </p>
      <p className="text text_type_digits-default">{props.value}</p>
    </div>
  );
}

IngredientNutrition.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
