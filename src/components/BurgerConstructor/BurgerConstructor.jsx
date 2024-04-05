import React, { useEffect, useState, useMemo } from "react";
import styles from "./BurgerConstructor.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "./../../utils/types";
import { Modal } from "./../Modal/Modal";
import { OrderDetails } from "./../OrderDetails/OrderDetails";
import { makeOrder } from './../../services/actions/order'
import { useDispatch, useSelector } from "react-redux";
import { addIngredient} from './../../services/actions/choosenIngredient'
import { useDrop } from "react-dnd";
import { BurgerConstructorItem } from './BurgerConstructorItem'

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function BurgerConstructor() {

  const {ingredients} = useSelector(store => store.choosenIngredients);
  console.log(ingredients)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const dispatch = useDispatch()

  function onDropHandler(item){
    
    dispatch(addIngredient(item.ingredient))
  }

  const [, dropTarget] = useDrop({
    accept: "ing",
    drop(item) {
        onDropHandler(item);
    },
});

const bunItems = ingredients.filter(ing=> ing.type === 'bun')
const bun = bunItems.length !== 0 ? bunItems[0] : undefined

  const calcBurgerPrice = useMemo(() => {
    return () => {
      let totalPrice = 0;

      ingredients.forEach(addedIngredient => {
          if (addedIngredient.type !== 'bun') {
            totalPrice += addedIngredient.price
          }
          else {
            totalPrice += addedIngredient.price * 2
          }
        
      });
      return totalPrice;
    }
  }, [ingredients, bun])


  const finalPrice = calcBurgerPrice();


 
    return (
      <>
        <div ref={dropTarget} className={`${styles.burgerconstructor} mt-25`}>
          {ingredients.length !== 0 ? 
          <>
          <div className="pl-8 pr-4">
            {bunItems.length !== 0 ? <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            /> : <p>Добавь булку</p>}
          </div>

          <div className={styles.burgerconstructor__main}>
            {ingredients.filter(ing=>ing.type!=='bun').map((el, index) =>
              
              <BurgerConstructorItem item={el} index={index} key={el.id}/>
              
            )}
          </div>

          <div className="pl-8 pr-4">
          {bunItems.length !== 0 ? <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            /> : <p>Добавь булку</p>}
          </div> </> : 
          <div className={`text text_type_main-medium ${styles.empty}`}>
            Начни собирать бургер
          </div> }

          <div className={`${styles.burgerconstructor__total} mt-6`}>
            <p className="text text_type_digits-medium mr-2">
              {finalPrice}
            </p>
            <span className={`${styles.burgerconstructor__currency} pr-10`}>
              <CurrencyIcon type="primary" />
            </span>

            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                dispatch(makeOrder(ingredients))
                setIsOrderModalOpen(true)
              }}
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


BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
