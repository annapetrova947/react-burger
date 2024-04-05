import { 
    ConstructorElement, 
    DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

import { sortIngredients } from "../../services/actions/choosenIngredient"
import { deleteIngredient } from "./../../services/actions/choosenIngredient"

import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import styles from "./BurgerConstructorItem.module.css";

export function BurgerConstructorItem({ item, index, handleDeleteIngredient }) {
    const dispatch = useDispatch();
    const ref = useRef(null);
  

  const [{ isDragging }, drag] = useDrag({
    type: "sortItem",
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "sortItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }


      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortIngredients({ to: dragIndex, from: hoverIndex }));

      item.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  return (
    <div
      key={item.id}
      className={styles.item}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        index={index}
        handleClose={() => dispatch(deleteIngredient(item.id))}
      />
    </div>
  );
}

BurgerConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteIngredient: PropTypes.func,
};
