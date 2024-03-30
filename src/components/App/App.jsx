import React from "react";
import "./App.css";
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerIngredients } from "../BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import { data } from "../../utils/data";

function App() {
  const DATA_URL = "";

  const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    const getData = () => {
      fetch("https://norma.nomoreparties.space/api/ingredients")
        .then((res) => res.json())
        .then((jsonData) => setData(jsonData.data))
        .catch((e) => console.log(e));
    };

    getData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className="main">
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
