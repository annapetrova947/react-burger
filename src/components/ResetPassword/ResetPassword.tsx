import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent} from "react";
import styles from "./ResetPassword.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "./../../services/store";
import { userResetPassword } from "../../services/actions/password";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [token, setToken] = React.useState("");
  const inputRef = React.useRef(null);
  const handleChangeToken = (e: ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const dispatch = useDispatch();

  function handleResetPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(userResetPassword(password, token));
  }

  const { resetPasswordResponse } = useSelector((store) => store.passwordReset);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordResponse["success"] === true) {
      navigate("/login");
    }
  }, [resetPasswordResponse]);

  return (
    <div className={styles.reset_password}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form onSubmit={handleResetPassword}>
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
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}        />

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
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
