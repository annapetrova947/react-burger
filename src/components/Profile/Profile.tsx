import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { ProfileInfo } from "../ProfileInfo/ProfileInfo";
import { useDispatch } from "./../../services/store";
import { logout } from "../../services/actions/auth";
import { useLastRoute } from './../LastRouteContext';

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLastRoute } = useLastRoute();

  const handleLogout = () => {
    setLastRoute('/');
    navigate("/login");
    dispatch(logout());
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menu}>
          <div className={`${styles.navigation} text text_type_main-medium`}>
            <NavLink
              end
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navlink} `
                  : styles.navlink
              }
              to="/profile"
            >
              Профиль
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles.navlink} `
                  : styles.navlink
              }
              to="/profile/orders"
            >
              История заказов
            </NavLink>
            <button
              className={`${styles.button} text text_type_main-medium`}
              type="button"
              onClick={handleLogout}
            >
              Выход
            </button>
          </div>
          <p className={`${styles.text} text text_type_main-default`}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        <div className={styles.profile_info}>
          <ProfileInfo />
        </div>
      </div>
    </>
  );
}
