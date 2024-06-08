import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent} from "react";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "./../../services/store";
import { loginUser } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Login() {
  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    dispatch(
      loginUser({
        email: email,
        password: password,
      }),
    );
  }

  const { loginRequest, loginFailed, loginResponse } = useSelector(
    (store) => store.auth,
  );

  useEffect(() => {
    if (loginResponse["success"] == true) {
      navigate("/");
    }
  }, [loginResponse]);

  return (
    <div className={styles.login}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form>
        <EmailInput
          onChange={handleChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleLogin}
        >
          {loginRequest ? "Загрузка..." : "Войти"}
        </Button>
      </form>
      {loginFailed ? <p>Произошла ошибка</p> : ""}
      <p className="text text_type_main-default mt-20 mb-4">
        Вы — новый пользователь?{" "}
        <NavLink to="/register" className={styles.link}>
          Зарегистрироваться
        </NavLink>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <NavLink to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </NavLink>
      </p>
    </div>
  );
}
