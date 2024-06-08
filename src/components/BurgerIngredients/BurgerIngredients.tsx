import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import React, { useEffect } from "react";
import { BurgerIngredientsBlock } from "../BurgerIngredientsBlock/BurgerIngredientsBlock";
import { useSelector } from "./../../services/store";
import { useInView } from "react-intersection-observer";

export function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const [bunsRef, bunsInView] = useInView();
  const [saucesRef, saucesInView] = useInView();
  const [stuffingRef, mainInView] = useInView();

  const { items } = useSelector(
    (store) => store.ingredients,
  );

  useEffect(() => {
    if (bunsInView) {
      setCurrent("bun");
    } else if (saucesInView) {
      setCurrent("sauce");
    } else if (mainInView) {
      setCurrent("main");
    }
  }, [bunsInView, saucesInView, mainInView]);

  const setCurrentTab = (tab: string) => {
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
        {items.length !== 0 ? (
          <>
            <div ref={bunsRef}>
              <BurgerIngredientsBlock name="Булки" data={items} id="bun" />
            </div>
            <div ref={stuffingRef}>
              <BurgerIngredientsBlock name="Соусы" data={items} id="sauce" />
            </div>
            <div ref={saucesRef}>
              <BurgerIngredientsBlock name="Начинки" data={items} id="main" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
