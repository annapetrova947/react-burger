import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./ResetPassword.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userResetPassword } from "../../services/actions/password";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function ResetPassword() {
  const [password, setPassword] = React.useState("");
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const [token, setToken] = React.useState("");
  const inputRef = React.useRef(null);
  const handleChangeToken = (e) => {
    setToken(e.target.value);
  };

  const dispatch = useDispatch();

  function handleResetPassword() {
    dispatch(userResetPassword(password, token));
  }

  const { resetPasswordResponse } = useSelector((store) => store.passwordReset);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("resetPasswordResponse", resetPasswordResponse);
    if (resetPasswordResponse["success"] == true) {
      navigate("/");
    }
  }, [resetPasswordResponse]);

  return (
    <div className={styles.reset_password}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form>
        <PasswordInput
          onChange={handleChangePassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
          placeholder="Введите новый пароль"
        />

        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChangeToken}
          value={token}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleResetPassword}
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default mt-20 mb-4">
        Вспомнили пароль?{" "}
        <NavLink to="/login" className={styles.link}>
          Войти
        </NavLink>
      </p>
    </div>
  );
}
