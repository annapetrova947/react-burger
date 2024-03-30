import React from "react";
import { Ingredient } from "./../Ingredient/Ingredient";
import "./BurgerIngredientsBlock.css";
import { Modal } from "./../Modal/Modal";
import { IngredientDetails } from "./../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";

export function BurgerIngredientsBlock(props) {
  const [isIngredientModalOpen, setIsIngredientModalOpen] =
    React.useState(false);
  const [ingredientForModal, setIngredientForModal] = React.useState();

  function handleOpenModal(ingredient) {
    setIsIngredientModalOpen(true);
    setIngredientForModal(ingredient);
  }

  function handleCloseModal() {
    setIsIngredientModalOpen(false);
    setIngredientForModal(undefined);
  }

  return (
    <div className="ingredientsblock">
      <p
        className="ingredientsblock__name text text_type_main-medium"
        id={props.id}
      >
        {props.name}
      </p>
      <div className="ingredientsblock__ingredients">
        {props.data
          .filter((el) => el.type === props.id)
          .map((el) => (
            <Ingredient
              ingredient={el}
              key={el._id}
              onClickFunction={() => handleOpenModal(el)}
            />
          ))}
      </div>
      <Modal
        isOpen={isIngredientModalOpen}
        title="Детали ингредиента"
        onClose={() => setIsIngredientModalOpen(false)}
      >
        <IngredientDetails ingredient={ingredientForModal} />
      </Modal>
    </div>
  );
}

BurgerIngredientsBlock.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
