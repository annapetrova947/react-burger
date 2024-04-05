import React from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../services/actions/ingredients";

function App() {
  const {items, itemsRequest, itemsFailed} = useSelector(store => store.ingredients);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getItems())
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {items.length !== 0 ? (
          <>
            <BurgerIngredients data={items} />
            <BurgerConstructor data={items} />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
