import React from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../Forms/Button/Index";
import Input from "../Forms/Input";
import styles from "./Login.module.css";
import stylesBtn from "../Forms/Button/Button.module.css";
import useForm from "../../Hooks/useForm";

import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  Login,
  selectUserError,
  selectUserStatus,
  selectUserToken,
} from "../../Redux/user/userSlice";

function LoginForm() {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);
  const status = useSelector(selectUserStatus);
  const token = useSelector(selectUserToken);

  const canSend = [username.value, password.value].every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate) {
      const data = {
        username: username.value,
        password: password.value,
      };
      try {
        const response = await dispatch(Login(data));
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(getUserData());
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  if (token) return <Navigate to="/conta" />;

  return (
    <section className={`${styles.login} animeLeft`}>
      <div className={styles.forms}>
        <h1 className="title">Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />

          {status === "pending" ? (
            <Button className="loading" disabled>
              <p className="loading"></p>
            </Button>
          ) : (
            <Button disabled={!canSend}>Entrar</Button>
          )}

          {error && <p className="error">{error}</p>}
        </form>
        <br />
        <Link className={styles.perdeu} to="/login/perdeu">
          Perdeu a Senha?
        </Link>
        <div className={styles.cadastro}>
          <h2 className={styles.subtitle}> Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site</p>
          <br />
          <Link className={stylesBtn.button} to="/login/criar">
            Cadastro
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
