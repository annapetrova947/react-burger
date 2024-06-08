import styles from "./ProfileInfo.module.css";
import React, {ChangeEvent, FormEvent, SyntheticEvent} from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "./../../services/store";
import { getUser, updateUser } from "../../services/actions/user";

export function ProfileInfo() {
  const [isFormChanged, setIsFormChanged] = useState(false);
  const dispatch = useDispatch();
  const { email, name } = useSelector((store) => store.user);
  const [form, setFormValues] = useState({
    name: name,
    email: email,
    password: "",
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    setFormValues({
      name: name,
      email: email,
      password: "",
    });
  }, [email, name]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...form, [e.target.name]: e.target.value });
    setIsFormChanged(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setIsFormChanged(false);
  };

  const handleCancel = (e: SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setFormValues({
      name: name,
      email: email,
      password: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        value={form.name}
        onChange={handleChange}
        icon={"EditIcon"}
        error={false}
        extraClass={styles.name_input} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />

      <Input
        type={"text"}
        name={"email"}
        placeholder={"e-mail"}
        value={form.email}
        onChange={handleChange}
        icon={"EditIcon"}
        error={false}
        extraClass={styles.email_input} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      />

      <PasswordInput
        name={"password"}
        placeholder={"Пароль"}
        value={form.password}
        onChange={handleChange}
        size={"default"}
        icon={"EditIcon"}
        extraClass={styles.password_input}
      />
      {isFormChanged && (
        <div className={styles.wrapper}>
          <Button htmlType="submit">Сохранить</Button>
          <Button onClick={handleCancel} htmlType="button" type="secondary">
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
}
