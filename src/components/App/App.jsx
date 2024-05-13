import React from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <>
          <BurgerIngredients />
          <BurgerConstructor />
        </>
      </main>
    </div>
  );
}

export default App;
