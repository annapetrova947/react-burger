import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./AppHeader.css";

export function AppHeader() {
  return (
    <header className="header mt-4 mb-4">
      <div className="header__menu">
        <div className="mr-2 pl-5 pr-5 pt-4 pb-4 header__constructor">
          <BurgerIcon type="primary" />
          <p className="text text_type_main-small ml-2">Конструктор</p>
        </div>

        <div className="pl-5 pr-5 pt-4 pb-4 header__constructor">
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </div>
      </div>
      <div className="logo">
        <Logo />
      </div>

      <div className="pl-5 pr-5 pt-4 pb-4 header__constructor">
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </div>
    </header>
  );
}
