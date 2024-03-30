import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./Ingredient.css";
import PropTypes from "prop-types";

export function Ingredient(props) {
  return (
    <div className="ingredient" onClick={() => props.onClickFunction()}>
      <img src={props.ingredient.image} />
      <Counter count={1} size="default" extraClass="m-1" />
      <div className="ingredient__price-block">
        <p className="ingredient__price text text_type_digits-default mr-1">
          {props.ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>

      <p className="ingredient__name mt-1 text text_type_main-default">
        {props.ingredient.name}
      </p>
    </div>
  );
}

Ingredient.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
