import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import "./BurgerIngredients.css";
import React, { useEffect } from "react";
import { BurgerIngredientsBlock } from "./../BurgerIngredientsBlock/BurgerIngredientsBlock";

import PropTypes from "prop-types";

export function BurgerIngredients(props) {
  console.log(props.data);

  const [current, setCurrent] = React.useState("one");
  const [bunArray, setBunArray] = React.useState([]);

  useEffect(() => {
    setBunArray();
    console.log(bunArray);
  }, []);

  const setCurrentTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);

    element?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div className="burgeringredients">
      <h2 className="text text_type_main-large mt-10 mb-5 burgeringredients__title">
        Соберите бургер
      </h2>
      <div style={{ display: "flex" }}>
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
      <div className="burgeringredients__ingredients">
        <BurgerIngredientsBlock name="Булки" data={props.data} id="bun" />
        <BurgerIngredientsBlock name="Соусы" data={props.data} id="sauce" />
        <BurgerIngredientsBlock name="Начинки" data={props.data} id="main" />
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
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
