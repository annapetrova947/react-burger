import React, { useEffect, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import { Modal } from "./../Modal/Modal";
import { OrderDetails } from "./../OrderDetails/OrderDetails";

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor(props) {
  const [ing, setIng] = useState([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    let arr = [];
    props.data.map((element) => {
      if (element.type === "bun" && arr.every((el) => el.type !== "bun")) {
        arr.unshift(element);
      } else if (
        element.type === "sauce" &&
        arr.every((el) => el.type !== "sauce")
      ) {
        arr.push(element);
      } else if (element.type === "main") {
        arr.push(element);
      }
    });
    arr.push(arr[0]);

    setIng(arr);
  }, [props.data]);

  if (ing.length !== 0) {
    return (
      <>
        <div className={`${styles.burgerconstructor} mt-25`}>
          <div className="pl-8 pr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={ing[0].name + " (верх)"}
              price={ing[0].price}
              thumbnail={ing[0].image}
            />
          </div>

          <div className={styles.burgerconstructor__main}>
            {ing.map((el, i) =>
              i !== 0 && i !== ing.length - 1 ? (
                <div className={styles.burgerconstructor__card} key={el._id}>
                  <DragIcon
                    type="primary"
                    className={styles.burgerconstructor__dragicon}
                  />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </div>
              ) : (
                ""
              ),
            )}
          </div>

          <div className="pl-8 pr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={ing[ing.length - 1].name + " (низ)"}
              price={ing[0].price}
              thumbnail={ing[0].image}
            />
          </div>

          <div className={`${styles.burgerconstructor__total} mt-6`}>
            <p className="text text_type_digits-medium mr-2">
              {ing.reduce((sum, ingredient) => sum + ingredient.price, 0)}
            </p>
            <span className={`${styles.burgerconstructor__currency} pr-10`}>
              <CurrencyIcon type="primary" />
            </span>

            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => setIsOrderModalOpen(true)}
            >
              Оформить заказ
            </Button>

            {isOrderModalOpen && (
              <Modal onClose={() => setIsOrderModalOpen(false)}>
                <OrderDetails />
              </Modal>
            )}
          </div>
        </div>
      </>
    );
  }
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
