import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import React, { useEffect } from "react";
import { BurgerIngredientsBlock } from "./../BurgerIngredientsBlock/BurgerIngredientsBlock";
import { ingredientType } from "./../../utils/types";
import { useInView } from 'react-intersection-observer';

import PropTypes from "prop-types";

export function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
  const [bunArray, setBunArray] = React.useState([]);
  const [bunsRef, bunsInView] = useInView();
  const [saucesRef, saucesInView] = useInView();
  const [stuffingRef, mainInView] = useInView();

  useEffect(() => {
    if (bunsInView) {
      setCurrent('bun');
    } else if (saucesInView) {
      setCurrent('sauce');
    } else if (mainInView) {
      setCurrent('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const setCurrentTab = (tab) => {
    
    const element = document.getElementById(tab);

    element?.scrollIntoView({ block: "start", behavior: "smooth" });
    
    setCurrent(tab);
  };

  return (
    <div className={styles.burgeringredients}>
      <h2 className={`text text_type_main-large mt-10 mb-5 ${styles.title}`}>
        Соберите бургер
      </h2>
      <div className={styles.tab}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => setCurrentTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => setCurrentTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => setCurrentTab("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        


        <div ref={bunsRef}>
            <BurgerIngredientsBlock name="Булки" data={props.data} id="bun"/>
          </div>
          <div ref={stuffingRef}>
            <BurgerIngredientsBlock name="Соусы" data={props.data} id="sauce"/>
          </div>
          <div ref={saucesRef}>
            <BurgerIngredientsBlock name="Начинки" data={props.data} id="main"/>
          </div>
      </div>

      </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
