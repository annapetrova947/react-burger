import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AppHeader() {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((store) => store.auth);

  function navigateToProfile() {
    isLoggedIn ? navigate("/profile") : navigate("/login");
  }

  return (
    <header className={`${styles.header} mt-4 mb-4`}>
      <div className={styles.menu}>
        <div className={`mr-2 pl-5 pr-5 pt-4 pb-4 ${styles.constructor}`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small ml-2">Конструктор</p>
        </div>

        <div className={`pl-5 pr-5 pt-4 pb-4 ${styles.constructor}`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Лента заказов
          </p>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div
        className={`${styles.constructor} pl-5 pr-5 pt-4 pb-4 `}
        onClick={navigateToProfile}
      >
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">
          Личный кабинет
        </p>
      </div>
    </header>
  );
}
