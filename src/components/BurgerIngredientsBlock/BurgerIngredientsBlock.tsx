import React from "react";
import { Ingredient } from "../Ingredient/Ingredient";
import styles from "./BurgerIngredientsBlock.module.css";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import { TIngredient } from "../../utils/types";
import { useDispatch, useSelector } from "./../../services/store"


type BurgerIngredientsBlock = {
  id: string,
  name: string,
  data: Array<TIngredient>,
};

export function BurgerIngredientsBlock(props: BurgerIngredientsBlock) {
  const [isIngredientModalOpen, setIsIngredientModalOpen] =
    React.useState(false);

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
          .filter((el: TIngredient) => el.type === props.id)
          .map((el: TIngredient) => (
            <Ingredient ingredient={el} key={el._id} />
          ))}
      </div>
      {isIngredientModalOpen && (
        <Modal
          title="Детали ингредиента"
          onClose={() => {
            handleCloseModal();
            //dispatch(deleteIngredientFromModal());
          }}
        >
         
        </Modal>
      )}
    </div>
  );
}


