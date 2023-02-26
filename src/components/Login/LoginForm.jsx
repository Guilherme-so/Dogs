import React from "react";
import { Link } from "react-router-dom";
import Button from "../Forms/Button/Index";
import Input from "../Forms/Input";
import styles from "./Login.module.css";
import stylesBtn from "../Forms/Button/Button.module.css";
import useForm from "../../Hooks/useForm";

import { useDispatch } from "react-redux";
import { userLogin, getUser } from "../../Redux/user/userSlice";

function LoginForm() {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();

  const canSend = [username.value, password.value].every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate) {
      dispatch(
        userLogin({
          username: username.value,
          password: password.value,
        })
      );
      dispatch(getUser());
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button disabled={!canSend}>Entrar</Button>
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
    </section>
  );
}

export default LoginForm;
