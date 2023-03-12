import React from "react";
import useForm from "../../../Hooks/useForm";
import Input from "../../Forms/Input/index";
import Button from "../../Forms/Button/Index";
import styles from "./cadastre.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cadastre } from "../../../Redux/user/authAsyncActions";
import {
  selectUserError,
  selectUserStatus,
} from "../../../Redux/user/userSlice";

function LoginCreate() {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const data = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      dispatch(cadastre(data));
      username.setValue("");
      email.setValue("");
      password.setValue("");
    }
  };

  return (
    <section className={`${styles.cadastre} animeLeft`}>
      <form onSubmit={handleSubmit} className={styles.forms}>
        <h1 className="title">Cadastre-se</h1>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />

        {status === "pending" ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default LoginCreate;
