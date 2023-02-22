import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../Forms/Button/Index";
import Input from "../Forms/Input";
import styles from "./Login.module.css";
import stylesBtn from "../Forms/Button/Button.module.css";
import useForm from "../../Hooks/useForm";
import { GET_TOKEN, GET_USER } from "../../api";

function LoginForm() {
  const username = useForm();
  const password = useForm();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      get_user();
    }
  }, []);

  async function get_user() {
    const token = window.localStorage.getItem("token");
    const { url, options } = GET_USER(token);

    const resp = await fetch(url, options);
    const data = await resp.json();
    console.log("user: ", data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.validate() && password.validate) {
      const { url, options } = GET_TOKEN({
        username: username.value,
        password: password.value,
      });
      const resp = await fetch(url, options);
      const data = await resp.json();
      console.log(data);
      window.localStorage.setItem("token", data.token);
      get_user();
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        <Button>Entrar</Button>
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
