import { BurgerIngredients } from "../components/BurgerIngredients/BurgerIngredients";
import { BurgerConstructor } from "../components/BurgerConstructor/BurgerConstructor";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.home}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}
