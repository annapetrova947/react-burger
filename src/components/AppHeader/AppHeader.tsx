import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";

export function AppHeader() {

  return (
    <header className={`${styles.header} mt-4 mb-4`}>
      <div className={styles.menu}>
        <Link className={`mr-2 pl-5 pr-5 pt-4 pb-4 ${styles.constructor}`} to='/'>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small ml-2">Конструктор</p>
        </Link>

        <Link className={`pl-5 pr-5 pt-4 pb-4 ${styles.constructor}`} to='/'>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </p>
        </Link>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>

      <Link
        className={`${styles.constructor} pl-5 pr-5 pt-4 pb-4 `}
        to='/profile'
      >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </p>
      </Link>
    </header>
  );
}
