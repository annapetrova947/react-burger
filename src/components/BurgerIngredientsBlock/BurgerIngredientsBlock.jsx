import React from "react";
import { Ingredient } from "./../Ingredient/Ingredient";
import styles from "./BurgerIngredientsBlock.module.css";
import { Modal } from "./../Modal/Modal";
import { IngredientDetails } from "./../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {deleteIngredientFromModal, addIngredientToModal} from './../../services/actions/modal';

export function BurgerIngredientsBlock(props) {
  const dispatch = useDispatch()
  const {currentIngredient} = useSelector(store => store.modal);
  const [isIngredientModalOpen, setIsIngredientModalOpen] =
    React.useState(false);

  function handleOpenModal(ingredient) {
    setIsIngredientModalOpen(true);
  }

  function handleCloseModal() {
    setIsIngredientModalOpen(false);
  }

  return (
    <div>
      <p className={`${styles.name} text text_type_main-medium`} id={props.id}>
        {props.name}
      </p>
      <div className={styles.ingredients}>
        {props.data
          .filter((el) => el.type === props.id)
          .map((el) => (
            <Ingredient
              ingredient={el}
              key={el._id}
              onClickFunction={() => {
                dispatch(addIngredientToModal(el))
                handleOpenModal(el)
              }
              }
            />
          ))}
      </div>
      {isIngredientModalOpen && (
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            handleCloseModal()
            dispatch(deleteIngredientFromModal())}}
        >
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
}

BurgerIngredientsBlock.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
