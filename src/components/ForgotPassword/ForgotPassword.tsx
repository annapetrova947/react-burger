import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent} from "react";
import styles from "./ForgotPassword.module.css";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "./../../services/store";
import { userForgotPassword } from "../../services/actions/password";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const dispatch = useDispatch();

  function handleForgotPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userForgotPassword(email));
  }

  const { forgotPasswordResponse } = useSelector(
    (store) => store.passwordReset,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (forgotPasswordResponse["success"] == true) {
      navigate("/reset-password");
    }
  }, [forgotPasswordResponse]);

  return (
    <div className={styles.forgot_password}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form onSubmit={handleForgotPassword}>
        <EmailInput
          onChange={handleChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          placeholder="Укажите e-mail"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
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
