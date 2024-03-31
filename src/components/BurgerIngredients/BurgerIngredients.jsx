import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import React, { useEffect } from "react";
import { BurgerIngredientsBlock } from "./../BurgerIngredientsBlock/BurgerIngredientsBlock";
import { ingredientType } from "./../../utils/types";

import PropTypes from "prop-types";

export function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  const [bunArray, setBunArray] = React.useState([]);

  useEffect(() => {
    setBunArray();
  }, []);

  const setCurrentTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);

    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className={styles.burgeringredients}>
      <h2 className={`text text_type_main-large mt-10 mb-5 ${styles.title}`}>
        Соберите бургер
      </h2>
      <div className={styles.tab}>
        <Tab
          value="one"
          active={current === "bun"}
          onClick={() => setCurrentTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "sauce"}
          onClick={() => setCurrentTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "main"}
          onClick={() => setCurrentTab("main")}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <BurgerIngredientsBlock name="Булки" data={props.data} id="bun" />
        <BurgerIngredientsBlock name="Соусы" data={props.data} id="sauce" />
        <BurgerIngredientsBlock name="Начинки" data={props.data} id="main" />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
