import React from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";

function App() {
  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    const getData = () => {
      fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((jsonData) => setData(jsonData.data))
        .catch(console.error);
    };

    getData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {data !== undefined ? (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
