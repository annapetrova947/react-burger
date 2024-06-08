import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, ChangeEvent } from "react";
import styles from "./Register.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "./../../services/store";
import { registerUser } from "../../services/actions/auth";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [email, setEmail] = React.useState("");
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = React.useState("");
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const [name, setName] = React.useState("");
  const inputRef = React.useRef(null);
  const handleChangeNamed = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleRegister() {
    dispatch(
      registerUser({
        email: email,
        password: password,
        name: name,
      }),
    );
  }

  const { registerRequest, registerFailed, registerResponse } = useSelector(
    (store) => store.auth,
  );

  useEffect(() => {
    if (registerResponse["success"] == true) {
      navigate("/");
    }
  }, [registerResponse]);

  return (
    <div className={styles.register}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeNamed}
          value={name}
          name={"name"}
          error={false}
          ref={inputRef}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
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
          onClick={handleRegister}
        >
          {registerRequest ? "Загрузка..." : "Зарегистрироваться"}
        </Button>
      </form>
      {registerFailed ? <p>Произошла ошибка</p> : ""}
      <p className="text text_type_main-default mt-20 mb-4">
        Уже зарегистрированы?{" "}
        <NavLink to="/login" className={styles.link}>
          Войти
        </NavLink>
      </p>
    </div>
  );
}
